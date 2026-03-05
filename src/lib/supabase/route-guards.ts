import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export type TeamRole = "admin" | "dispatcher" | "manager" | "field_agent";

type GuardSuccess = {
    ok: true;
    adminClient: ReturnType<typeof createSupabaseAdminClient>;
    authUserId: string;
    role: TeamRole;
};

type GuardFailure = {
    ok: false;
    response: NextResponse;
};

export async function requireDashboardRole(
    allowedRoles: TeamRole[]
): Promise<GuardSuccess | GuardFailure> {
    const serverClient = await createSupabaseServerClient();
    const {
        data: { user },
        error: userError,
    } = await serverClient.auth.getUser();

    if (userError || !user) {
        return {
            ok: false,
            response: NextResponse.json(
                { error: "You must be signed in." },
                { status: 401 }
            ),
        };
    }

    const adminClient = createSupabaseAdminClient();
    const { data: member, error: memberError } = await adminClient
        .from("team_members")
        .select("role, is_active")
        .eq("auth_user_id", user.id)
        .single();

    if (memberError || !member) {
        return {
            ok: false,
            response: NextResponse.json(
                { error: "No team membership is linked to this account." },
                { status: 403 }
            ),
        };
    }

    if (!member.is_active) {
        return {
            ok: false,
            response: NextResponse.json(
                { error: "Your team account is inactive." },
                { status: 403 }
            ),
        };
    }

    if (!allowedRoles.includes(member.role as TeamRole)) {
        return {
            ok: false,
            response: NextResponse.json(
                { error: "You do not have permission to perform this action." },
                { status: 403 }
            ),
        };
    }

    return {
        ok: true,
        adminClient,
        authUserId: user.id,
        role: member.role as TeamRole,
    };
}
