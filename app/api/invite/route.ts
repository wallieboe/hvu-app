import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Role } from '@prisma/client';
import { Resend } from 'resend';
import { randomBytes } from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY || "re_123_dummy");

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== Role.ADMIN && session.user.role !== Role.TREASURER)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { email, role } = await req.json();

    if (!email || !role) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Create invite token
    const token = randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    try {
        const invitation = await prisma.invitation.create({
            data: {
                email,
                role: role as Role,
                token,
                expires,
                senderId: session.user.id
            }
        });

        // Send email
        await resend.emails.send({
            from: 'HVU Portaal <onboarding@resend.dev>', // Update with real domain later
            to: email,
            subject: 'Uitnodiging HVU Portaal',
            html: `<p>Je bent uitgenodigd voor het HVU Portaal als <strong>${role}</strong>.</p>
             <p>Log in via deze link: <a href="${process.env.NEXTAUTH_URL}/api/auth/signin?email=${email}">Inloggen</a></p>`
        });

        return NextResponse.json({ success: true, invitation });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create invitation' }, { status: 500 });
    }
}
