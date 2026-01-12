import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import EmailProvider from "next-auth/providers/email"
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_123_dummy");

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM,
            sendVerificationRequest: async ({ identifier, url, provider }) => {
                // Use Resend to send the email
                // We can customize the template here later
                try {
                    await resend.emails.send({
                        from: provider.from as string,
                        to: identifier,
                        subject: 'Inloggen bij HVU',
                        html: `<p>Klik <a href="${url}">hier</a> om in te loggen.</p>`
                    });
                } catch (error) {
                    console.log({ error });
                    throw new Error('Failed to send verification email');
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user }: { user: any }) {
            // Allow login if user exists in DB
            // The seed script creates the first Admin
            // Invitations create the subsequent users
            if (!user.email) return false;

            const existingUser = await prisma.user.findUnique({
                where: { email: user.email }
            });

            if (existingUser) {
                return true;
            }

            // If getting here, user is not in DB.
            // In a closed system, we deny access unless we want to allow auto-signup via invite flow?
            // Actually, the invite flow should CREATE the user or creating the invitation should allow the sign in?
            // Let's assume the Invitation flow creates a User record pre-emptively or we check against the Invitation table here.

            // Strategy: 
            // 1. Admin creates Invitation -> This creates a record in Invitation table.
            // 2. User clicks link and signs in.
            // 3. We check here if there is a pending invitation for this email if User doesn't exist.

            const invitation = await prisma.invitation.findUnique({
                where: { email: user.email }
            });

            if (invitation) {
                return true; // Use will be created by Adapter automatically
            }

            return false; // Deny access
        },
        async session({ session, user }: { session: any, user: any }) {
            if (session?.user) {
                session.user.role = user.role; // Helper to pass role to client
                session.user.id = user.id;
            }
            return session
        }
    },
    pages: {
        signIn: '/auth/signin',
        verifyRequest: '/auth/verify-request',
        error: '/auth/error'
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
