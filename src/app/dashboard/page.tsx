import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    UserCircle,
    Truck,
    Users,
    CheckCircle2,
} from "lucide-react";

async function getStats() {
    const supabase = createSupabaseAdminClient();

    const [leadsRes, assignmentsRes, teamRes, completedRes] = await Promise.all([
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase
            .from("assignments")
            .select("id", { count: "exact", head: true })
            .not("status", "in", '("completed","invoiced")'),
        supabase
            .from("team_members")
            .select("id", { count: "exact", head: true })
            .eq("is_active", true),
        supabase
            .from("assignments")
            .select("id", { count: "exact", head: true })
            .eq("status", "completed"),
    ]);

    return {
        totalLeads: leadsRes.count ?? 0,
        activeJobs: assignmentsRes.count ?? 0,
        activeTeam: teamRes.count ?? 0,
        completedJobs: completedRes.count ?? 0,
    };
}

async function getRecentLeads() {
    const supabase = createSupabaseAdminClient();
    const { data } = await supabase
        .from("leads")
        .select("id, name, email, status, created_at, source")
        .order("created_at", { ascending: false })
        .limit(5);
    return data ?? [];
}

const STATUS_COLORS: Record<string, string> = {
    new: "bg-blue-500/10 text-blue-600",
    contacted: "bg-yellow-500/10 text-yellow-600",
    quoted: "bg-purple-500/10 text-purple-600",
    booked: "bg-green-500/10 text-green-600",
    lost: "bg-red-500/10 text-red-600",
    cancelled: "bg-gray-500/10 text-gray-500",
};

export default async function DashboardPage() {
    const [stats, recentLeads] = await Promise.all([getStats(), getRecentLeads()]);

    const statCards = [
        { label: "Total Leads", value: stats.totalLeads, icon: UserCircle },
        { label: "Active Jobs", value: stats.activeJobs, icon: Truck },
        { label: "Team Members", value: stats.activeTeam, icon: Users },
        { label: "Completed Jobs", value: stats.completedJobs, icon: CheckCircle2 },
    ];

    return (
        <div className="p-6 space-y-8 max-w-7xl">
            <div className="rounded-2xl border border-black/10 bg-gradient-to-r from-white via-[#FFFCEF] to-[#F8F6F0] p-6 md:p-8 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9A7B00]">
                    Command Center
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">Operations Overview</h1>
                <p className="text-muted-foreground text-sm mt-2">
                    Live pulse of leads, dispatch load, team capacity, and completed work.
                </p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map(({ label, value, icon: Icon }) => (
                    <Card key={label} className="border-black/10 bg-white/90 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {label}
                            </CardTitle>
                            <div className="rounded-lg bg-[#F6F1DF] p-2">
                                <Icon size={18} className="text-[#9A7B00]" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold tracking-tight">{value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent leads */}
            <Card className="border-black/10 bg-white shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Recent Leads</CardTitle>
                </CardHeader>
                <CardContent>
                    {recentLeads.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-8">
                            No leads yet. Create your first lead to get started.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {recentLeads.map((lead) => (
                                <div
                                    key={lead.id}
                                    className="flex items-center justify-between py-3 border-b border-border/70 last:border-0"
                                >
                                    <div>
                                        <p className="text-sm font-semibold">{lead.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {lead.email ?? "No email"} · {lead.source ?? "manual"}
                                        </p>
                                    </div>
                                    <Badge
                                        className={
                                            STATUS_COLORS[lead.status] ?? "bg-gray-100"
                                        }
                                        variant="outline"
                                    >
                                        {lead.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
