"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Mail } from "lucide-react";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        const res = await signIn("email", {
            email,
            redirect: false,
            callbackUrl: "/"
        });

        if (res?.error) {
            setStatus("error");
        } else {
            setStatus("success");
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Visual Side */}
            <div className="bg-hvu-dark text-white p-10 md:w-1/2 flex flex-col justify-between">
                <div className="font-display text-4xl uppercase tracking-wide">
                    Humanistisch <span className="text-hvu-red">Verbond</span>
                </div>
                <div>
                    <h1 className="text-5xl md:text-6xl font-display uppercase mb-4">
                        Penningmeester <br /> Portaal
                    </h1>
                    <p className="text-xl font-light text-gray-300">
                        Veilig inloggen om mutaties te beheren en facturen te verwerken.
                    </p>
                </div>
                <div className="text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Afdeling Utrecht
                </div>
            </div>

            {/* Login Side */}
            <div className="bg-hvu-cream p-10 md:w-1/2 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-display text-hvu-dark mb-6">Inloggen</h2>

                    {status === "success" ? (
                        <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-none">
                            <h3 className="font-bold mb-2">Check je e-mail</h3>
                            <p>We hebben een inloglink verstuurd naar <strong>{email}</strong>.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 uppercase tracking-wider mb-2">
                                    E-mailadres
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="naam@hvu-utrecht.nl"
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 focus:border-hvu-red focus:ring-1 focus:ring-hvu-red outline-none transition-colors rounded-none"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full bg-hvu-red hover:bg-red-700 text-white font-bold py-3 px-6 uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                            >
                                {status === "loading" ? "Versturen..." : "Stuur Inlog Link"}
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            {status === "error" && (
                                <p className="text-red-600 text-sm mt-2">
                                    Er ging iets mis. Controleer je e-mailadres of probeer het later opnieuw.
                                </p>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
