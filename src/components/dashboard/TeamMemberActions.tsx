"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type TeamMember = {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    role: string;
    region: string | null;
    pay_type: string | null;
    is_active: boolean;
};

export function TeamMemberActions({ member }: { member: TeamMember }) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [role, setRole] = useState(member.role);
    const [payType, setPayType] = useState(member.pay_type ?? "hourly");
    const [region, setRegion] = useState(member.region ?? "");
    const [phone, setPhone] = useState(member.phone ?? "");
    const [credentialMethod, setCredentialMethod] = useState<"invite_link" | "temp_password">("invite_link");
    const [temporaryPassword, setTemporaryPassword] = useState("");
    const [provisioning, setProvisioning] = useState(false);

    async function handleSave() {
        setSaving(true);
        const res = await fetch(`/api/team/${member.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role, pay_type: payType, region, phone }),
        });

        if (res.ok) {
            toast.success("Team member updated");
            router.refresh();
        } else {
            const { error } = await res.json();
            toast.error(error ?? "Failed to update member");
        }
        setSaving(false);
    }

    async function handleDeactivate() {
        if (!confirm(`Deactivate ${member.name}?`)) return;
        const res = await fetch(`/api/team/${member.id}`, { method: "DELETE" });
        if (res.ok) {
            toast.success("Team member deactivated");
            router.push("/dashboard/team");
        } else {
            toast.error("Failed to deactivate member");
        }
    }

    async function handleProvisionCredentials() {
        setProvisioning(true);
        const res = await fetch(`/api/team/${member.id}/credentials`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                method: credentialMethod,
                temporaryPassword,
            }),
        });

        if (res.ok) {
            const payload = await res.json();
            if (payload.temporaryPassword) {
                try {
                    await navigator.clipboard.writeText(payload.temporaryPassword);
                    toast.success("Temporary password copied to clipboard");
                } catch {
                    toast.info(`Temporary password: ${payload.temporaryPassword}`);
                }
            }
            if (payload.inviteLink) {
                try {
                    await navigator.clipboard.writeText(payload.inviteLink);
                    toast.success("Invite link copied to clipboard");
                } catch {
                    toast.info("Invite link generated successfully");
                }
            }

            toast.success(
                credentialMethod === "invite_link"
                    ? "Invite processed successfully"
                    : "Temporary password was reset"
            );
            setTemporaryPassword("");
            router.refresh();
        } else {
            const { error } = await res.json();
            toast.error(error ?? "Failed to manage credentials");
        }
        setProvisioning(false);
    }

    return (
        <div className="p-4 border border-border rounded-lg bg-card space-y-4 max-w-sm">
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <Label>Role</Label>
                    <Select value={role} onValueChange={setRole}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="dispatcher">Dispatcher</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="field_agent">Field Agent</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1.5">
                    <Label>Pay Type</Label>
                    <Select value={payType} onValueChange={setPayType}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="salary">Salary</SelectItem>
                            <SelectItem value="contractor">Contractor</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-1.5">
                <Label>Phone</Label>
                <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="416-555-0100"
                />
            </div>

            <div className="space-y-1.5">
                <Label>Region</Label>
                <Input
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder="Toronto, Mississauga…"
                />
            </div>

            <div className="flex gap-2">
                <Button onClick={handleSave} disabled={saving} className="flex-1">
                    {saving ? "Saving…" : "Save Changes"}
                </Button>
                {member.is_active && (
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleDeactivate}
                        className="shrink-0"
                    >
                        Deactivate
                    </Button>
                )}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
                <p className="text-sm font-medium">Account Access</p>
                <div className="space-y-1.5">
                    <Label>Credential Method</Label>
                    <Select
                        value={credentialMethod}
                        onValueChange={(v) => setCredentialMethod(v as "invite_link" | "temp_password")}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="invite_link">Invite Link</SelectItem>
                            <SelectItem value="temp_password">Temporary Password</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-1.5">
                    <Label>Temporary Password</Label>
                    <Input
                        value={temporaryPassword}
                        onChange={(e) => setTemporaryPassword(e.target.value)}
                        placeholder="Auto-generated if empty"
                        disabled={credentialMethod !== "temp_password"}
                    />
                </div>

                <Button
                    type="button"
                    variant="outline"
                    onClick={handleProvisionCredentials}
                    disabled={provisioning}
                    className="w-full"
                >
                    {provisioning ? "Processing…" : credentialMethod === "invite_link" ? "Send Invite" : "Set Temporary Password"}
                </Button>
            </div>
        </div>
    );
}
