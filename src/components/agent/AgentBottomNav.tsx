"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Briefcase, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useState } from "react";

const navItems = [
    { href: "/agent", label: "Home", icon: Home, exact: true },
    { href: "/agent/jobs", label: "All Jobs", icon: Briefcase },
    { href: "/agent/profile", label: "Profile", icon: User },
];

export function AgentBottomNav() {
    const pathname = usePathname();
    const router = useRouter();
    const [signingOut, setSigningOut] = useState(false);

    async function handleSignOut() {
        setSigningOut(true);
        const supabase = createSupabaseBrowserClient();
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    }

    return (
        <nav className="fixed bottom-0 left-0 right-0 safe-bottom z-50 pb-2">
            <div className="mx-auto max-w-lg rounded-2xl border border-black/10 bg-white/95 backdrop-blur-md shadow-lg flex items-center justify-around px-4 py-2">
                {navItems.map(({ href, label, icon: Icon, exact }) => {
                    const active = exact ? pathname === href : pathname.startsWith(href);
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg transition-colors min-w-[60px]",
                                active
                                    ? "text-[#9A7B00] bg-[#F6F1DF]"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Icon size={22} />
                            <span className="text-[10px] font-medium">{label}</span>
                        </Link>
                    );
                })}

                <button
                    onClick={handleSignOut}
                    disabled={signingOut}
                    className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors min-w-[60px]"
                >
                    <LogOut size={22} />
                    <span className="text-[10px] font-medium">Sign out</span>
                </button>
            </div>
        </nav>
    );
}
