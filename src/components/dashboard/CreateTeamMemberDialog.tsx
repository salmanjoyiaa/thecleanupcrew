"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function CreateTeamMemberDialog() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        role: "field_agent",
        region: "",
        pay_type: "hourly",
    });
    const [credentialMode, setCredentialMode] = useState<"none" | "invite_link" | "temp_password">("none");
    const [temporaryPassword, setTemporaryPassword] = useState("");

    function update(field: string, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);

        const res = await fetch("/api/team", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            const created = await res.json();

            if (credentialMode !== "none") {
                const credentialRes = await fetch(`/api/team/${created.id}/credentials`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        method: credentialMode,
                        temporaryPassword,
                    }),
                });

                if (!credentialRes.ok) {
                    const payload = await credentialRes.json();
                    toast.error(payload?.error ?? "Member created, but credentials failed.");
                } else {
                    const payload = await credentialRes.json();
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
                        credentialMode === "invite_link"
                            ? "Team member added and invite generated"
                            : "Team member added with temporary password"
                    );
                }
            } else {
                toast.success("Team member added");
            }

            setOpen(false);
            setForm({ name: "", email: "", phone: "", role: "field_agent", region: "", pay_type: "hourly" });
            setCredentialMode("none");
            setTemporaryPassword("");
            router.refresh();
        } else {
            const { error } = await res.json();
            toast.error(error ?? "Failed to add team member");
        }
        setSaving(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="gap-1.5">
                    <Plus size={16} />
                    Add Member
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add Team Member</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                    <div className="space-y-1.5">
                        <Label htmlFor="tm-name">Full Name *</Label>
                        <Input
                            id="tm-name"
                            required
                            value={form.name}
                            onChange={(e) => update("name", e.target.value)}
                            placeholder="Alex Johnson"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label htmlFor="tm-email">Email *</Label>
                            <Input
                                id="tm-email"
                                type="email"
                                required
                                value={form.email}
                                onChange={(e) => update("email", e.target.value)}
                                placeholder="alex@thecleanupcrew.ca"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="tm-phone">Phone</Label>
                            <Input
                                id="tm-phone"
                                type="tel"
                                value={form.phone}
                                onChange={(e) => update("phone", e.target.value)}
                                placeholder="416-555-0100"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label>Role *</Label>
                            <Select value={form.role} onValueChange={(v) => update("role", v)}>
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
                            <Select value={form.pay_type} onValueChange={(v) => update("pay_type", v)}>
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
                        <Label htmlFor="tm-region">Region / Area</Label>
                        <Input
                            id="tm-region"
                            value={form.region}
                            onChange={(e) => update("region", e.target.value)}
                            placeholder="Toronto, Mississauga…"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label>Login Setup</Label>
                            <Select
                                value={credentialMode}
                                onValueChange={(v) =>
                                    setCredentialMode(v as "none" | "invite_link" | "temp_password")
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">Create member only</SelectItem>
                                    <SelectItem value="invite_link">Send invite link</SelectItem>
                                    <SelectItem value="temp_password">Set temporary password</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="tm-temp-password">Temporary Password</Label>
                            <Input
                                id="tm-temp-password"
                                value={temporaryPassword}
                                onChange={(e) => setTemporaryPassword(e.target.value)}
                                placeholder="Auto-generated if empty"
                                disabled={credentialMode !== "temp_password"}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={saving}>
                            {saving ? "Saving…" : "Add Member"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
