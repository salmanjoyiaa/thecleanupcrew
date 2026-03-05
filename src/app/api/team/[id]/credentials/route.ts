import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { requireDashboardRole } from "@/lib/supabase/route-guards";

type CredentialMethod = "invite_link" | "temp_password";

function generateTemporaryPassword() {
    return `${randomBytes(5).toString("hex")}#A1`;
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const guard = await requireDashboardRole(["admin"]);
    if (!guard.ok) return guard.response;

    const { id } = await params;
    const body = await request.json();
    const method = body?.method as CredentialMethod;

    if (method !== "invite_link" && method !== "temp_password") {
        return NextResponse.json(
            { error: "Method must be either invite_link or temp_password." },
            { status: 400 }
        );
    }

    const { data: member, error: memberError } = await guard.adminClient
        .from("team_members")
        .select("id, name, email, role, auth_user_id")
        .eq("id", id)
        .single();

    if (memberError || !member) {
        return NextResponse.json({ error: "Team member not found." }, { status: 404 });
    }

    let authUserId = member.auth_user_id as string | null;
    let temporaryPassword: string | null = null;
    let inviteLink: string | null = null;

    if (method === "temp_password") {
        temporaryPassword = String(body?.temporaryPassword ?? "").trim() || generateTemporaryPassword();

        if (temporaryPassword.length < 10) {
            return NextResponse.json(
                { error: "Temporary password must be at least 10 characters." },
                { status: 400 }
            );
        }

        if (authUserId) {
            const { error } = await guard.adminClient.auth.admin.updateUserById(authUserId, {
                password: temporaryPassword,
                email_confirm: true,
            });

            if (error) {
                return NextResponse.json({ error: error.message }, { status: 500 });
            }
        } else {
            const { data, error } = await guard.adminClient.auth.admin.createUser({
                email: member.email,
                password: temporaryPassword,
                email_confirm: true,
                user_metadata: {
                    full_name: member.name,
                    role: member.role,
                },
            });

            if (error || !data.user) {
                return NextResponse.json(
                    { error: error?.message ?? "Unable to create auth account." },
                    { status: 500 }
                );
            }

            authUserId = data.user.id;
        }
    }

    if (method === "invite_link") {
        if (authUserId) {
            const { data, error } = await guard.adminClient.auth.admin.generateLink({
                type: "recovery",
                email: member.email,
            });

            if (error) {
                return NextResponse.json({ error: error.message }, { status: 500 });
            }

            inviteLink = data.properties?.action_link ?? null;
        } else {
            const { data, error } = await guard.adminClient.auth.admin.inviteUserByEmail(member.email, {
                data: {
                    full_name: member.name,
                    role: member.role,
                },
            });

            if (error || !data.user) {
                return NextResponse.json(
                    {
                        error:
                            error?.message ??
                            "Unable to send invite. If the user already exists, use temporary password mode.",
                    },
                    { status: 500 }
                );
            }

            authUserId = data.user.id;
        }
    }

    const { error: updateError } = await guard.adminClient
        .from("team_members")
        .update({
            auth_user_id: authUserId,
            credentials_sent: true,
            invited_at: new Date().toISOString(),
            last_invite_method: method,
            password_reset_required: method === "temp_password",
        })
        .eq("id", id);

    if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({
        success: true,
        method,
        temporaryPassword,
        inviteLink,
        message:
            method === "invite_link"
                ? "Invite flow completed."
                : "Temporary password was generated and saved.",
    });
}
