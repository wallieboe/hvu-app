"use client";

import { useState } from "react";
import { ArrowRight, Send, UserPlus } from "lucide-react";

export default function InvitePage() {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("READER");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/invite", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, role }),
            });

            if (!res.ok) throw new Error("Failed");

            setStatus("success");
            setEmail("");
        } catch (err) {
            setStatus("error");
        }
    };

    return (
        <div className="container mx-auto p-8 max-w-2xl text-hvu-dark">
            <h1 className="text-4xl font-display uppercase mb-2">Gebruiker Uitnodigen</h1>
            <p className="text-gray-600 mb-8">
                Stuur een uitnodiging naar een nieuwe gebruiker. Deze ontvangt een e-mail met inloginstructies.
            </p>

            <div className="bg-white p-8 shadow-sm border-t-4 border-hvu-red">
                {status === "success" && (
                    <div className="mb-6 bg-green-50 text-green-800 p-4 border border-green-200">
                        Uitnodiging succesvol verstuurd!
                    </div>
                )}

                <form onSubmit={handleInvite} className="space-y-6">
                    <div>
                        <label className="block font-medium uppercase text-sm tracking-wide mb-2">E-mailadres</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 focus:border-hvu-red focus:ring-1 focus:ring-hvu-red outline-none"
                            placeholder="naam@humanistischverbond.nl"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium uppercase text-sm tracking-wide mb-2">Rol</label>
                        <div className="grid grid-cols-2 gap-4">
                            <label className={`border p-4 cursor-pointer transition-colors ${role === 'READER' ? 'border-hvu-red bg-red-50' : 'border-gray-200'}`}>
                                <input type="radio" name="role" value="READER" checked={role === 'READER'} onChange={(e) => setRole(e.target.value)} className="sr-only" />
                                <div className="font-bold flex items-center gap-2"><UserPlus size={16} /> Lezer</div>
                                <div className="text-xs text-gray-500 mt-1">Kan alleen data inzien.</div>
                            </label>
                            <label className={`border p-4 cursor-pointer transition-colors ${role === 'TREASURER' ? 'border-hvu-red bg-red-50' : 'border-gray-200'}`}>
                                <input type="radio" name="role" value="TREASURER" checked={role === 'TREASURER'} onChange={(e) => setRole(e.target.value)} className="sr-only" />
                                <div className="font-bold flex items-center gap-2"><UserPlus size={16} /> Penningmeester</div>
                                <div className="text-xs text-gray-500 mt-1">Volledige toegang.</div>
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full bg-hvu-dark hover:bg-black text-white font-bold py-3 px-6 uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
                    >
                        {status === "loading" ? "Versturen..." : "Verstuur Uitnodiging"}
                        <Send className="w-4 h-4 ml-2" />
                    </button>
                </form>
            </div>
        </div>
    );
}
