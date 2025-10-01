"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// NOTE: This file is a single-file example for a Settings page that lets the user
// enable/disable TOTP-based MFA (Google Authenticator, Authy, etc.).
//
// Assumptions & developer notes:
// - Your project uses Next.js App Router and shadcn UI components.
// - Adjust import paths if your components live in different locations.
// - You must implement server endpoints (examples below in comments):
//     POST /api/mfa/setup      -> generate temp secret & return otpauth_url + setupId
//     POST /api/mfa/verify-setup -> verify the 6-digit code and persist the secret
//     POST /api/mfa/disable    -> disable MFA for the user (auth required)
// - On login, backend should return: { mfaRequired: true, mfaSessionId } when the user has MFA enabled.
//
// Client-side needs the `qrcode` package to render a QR image from the otpauth_url:
//    npm i qrcode
// and the component uses `toDataURL` from it.

import { toDataURL } from "qrcode";

export default function SettingsPage() {
    const [mfaEnabled, setMfaEnabled] = useState<boolean | null>(null); // null -> loading
    const [loading, setLoading] = useState(false);

    // setup state
    const [showSetupDialog, setShowSetupDialog] = useState(false);
    const [otpauthUrl, setOtpAuthUrl] = useState<string | null>(null);
    const [secretBase32, setSecretBase32] = useState<string | null>(null);
    const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
    const [setupId, setSetupId] = useState<string | null>(null);

    // verification code input
    const [code, setCode] = useState("");
    const [verifying, setVerifying] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // load current user settings (example endpoint)
        let mounted = true;
        (async () => {
            try {
                const res = await fetch("/api/user/me");
                if (!res.ok) throw new Error("Failed to fetch user");
                const data = await res.json();
                if (!mounted) return;
                setMfaEnabled(Boolean(data.mfaEnabled));
            } catch (e) {
                console.error(e);
                if (!mounted) return;
                setMfaEnabled(false);
            }
        })();
        return () => { mounted = false };
    }, []);

    useEffect(() => {
        // when otpauthUrl is set, create QR data url
        if (!otpauthUrl) return;
        let mounted = true;
        (async () => {
            try {
                const dataUrl = await toDataURL(otpauthUrl);
                if (mounted) setQrDataUrl(dataUrl);
            } catch (e) {
                console.error("QR generation failed", e);
                if (mounted) setQrDataUrl(null);
            }
        })();
        return () => { mounted = false };
    }, [otpauthUrl]);

    async function openSetup() {
        setError(null);
        setLoading(true);
        try {
            const res = await fetch("/api/mfa/setup", { method: "POST" });
            if (!res.ok) throw new Error("Failed to create MFA setup");
            const data = await res.json();
            // expected: { otpauthUrl, base32, setupId }
            setOtpAuthUrl(data.otpauthUrl || data.otpauth_url);
            setSecretBase32(data.base32 || data.secret || null);
            setSetupId(data.setupId || data.setup_id || null);
            setShowSetupDialog(true);
        } catch (e) {
            console.error(e);
            setError("Unable to start MFA setup. Try again later.");
        } finally {
            setLoading(false);
        }
    }

    async function verifySetup(e?: React.FormEvent) {
        e?.preventDefault();
        setError(null);
        if (!setupId) return setError("Missing setup id");
        if (code.trim().length === 0) return setError("Enter the 6-digit code from the app");
        setVerifying(true);
        try {
            const res = await fetch("/api/mfa/verify-setup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ setupId, code: code.trim() }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.message || "Verification failed");
            // success -> MFA enabled
            setMfaEnabled(true);
            setShowSetupDialog(false);
            // clear setup temp state
            setOtpAuthUrl(null);
            setSecretBase32(null);
            setQrDataUrl(null);
            setSetupId(null);
            setCode("");
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Something went wrong";
            console.error(err);
            setError(message || "Invalid code");
        } finally {
            setVerifying(false);
        }
    }

    async function disableMfa() {
        if (!confirm("Are you sure you want to disable MFA? This will make your account less secure.")) return;
        setLoading(true);
        try {
            const res = await fetch("/api/mfa/disable", { method: "POST" });
            if (!res.ok) throw new Error("Failed to disable MFA");
            setMfaEnabled(false);
        } catch (e) {
            console.error(e);
            alert("Could not disable MFA. Make sure you are authenticated and try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="p-6 max-w-5xl mx-auto py-24">
            <div className="mb-10 border-b pb-4">
                <h1 className="text-3xl font-bold">⚙️ Settings</h1>
                <p className="text-muted-foreground mt-1">Manage your account security and preferences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Security Card */}
                <div className="md:col-span-2 h-80">
                    <Card className="shadow-lg border rounded-2xl h-full flex flex-col justify-center space-y-10">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-xl">🔒 Security</span>
                            </CardTitle>
                            <CardDescription>
                                Two-factor authentication (TOTP) for account protection.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between ">
                                <div>
                                    <p className="font-medium">Multi-factor authentication</p>
                                    <div className="flex items-center gap-3 mt-2">
                                        <Badge
                                            variant={mfaEnabled ? "secondary" : "destructive"}
                                            className="px-3 py-1 text-sm"
                                        >
                                            {mfaEnabled ? "Enabled" : "Disabled"}
                                        </Badge>
                                        <p className="text-sm text-muted-foreground">
                                            We recommend enabling MFA to protect your account.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </CardContent>
                        <div className="flex justify-end px-5 gap-2">
                            {!mfaEnabled ? (
                                <Button
                                    className="cursor-pointer bg-emerald-600 hover:bg-emerald-700"
                                    onClick={openSetup}
                                    disabled={loading}
                                >
                                    {loading ? "Preparing..." : "Enable MFA"}
                                </Button>
                            ) : (
                                <Button
                                    className="cursor-pointer"
                                    variant="destructive"
                                    onClick={disableMfa}
                                    disabled={loading}
                                >
                                    Disable MFA
                                </Button>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Account Card */}
                <div className="h-80">
                    <Card className="shadow-md h-full border rounded-2xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                👤 Account
                            </CardTitle>
                            <CardDescription>Profile & recovery</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Manage your profile, change email or password, and set up recovery codes.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* MFA Setup Dialog */}
            <Dialog open={showSetupDialog} onOpenChange={setShowSetupDialog}>
                <DialogContent className="rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl">🔑 Set up Authenticator</DialogTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Scan the QR with Google Authenticator / Authy or enter the secret manually.
                        </p>
                    </DialogHeader>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* QR Section */}
                        <div className="flex flex-col items-center gap-4">
                            {qrDataUrl ? (
                                <img
                                    src={qrDataUrl}
                                    alt="MFA QR code"
                                    className="w-48 h-48 bg-white p-2 rounded-lg shadow"
                                />
                            ) : (
                                <div className="w-48 h-48 bg-muted/30 rounded-md flex items-center justify-center text-muted-foreground">
                                    QR
                                </div>
                            )}

                            {secretBase32 && (
                                <div className="mt-3 w-full">
                                    <Label>Secret key</Label>
                                    <div className="flex gap-2 items-center mt-2">
                                        <Input value={secretBase32} readOnly className="w-[220px]" />
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => navigator.clipboard.writeText(secretBase32)}
                                        >
                                            📋
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Verification Section */}
                        <div>
                            <form onSubmit={verifySetup} className="flex flex-col gap-4 bg-muted/10 p-4 rounded-lg">
                                <div>
                                    <Label>Verification code</Label>
                                    <Input
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        maxLength={6}
                                        placeholder="Enter 6-digit code"
                                    />
                                </div>

                                {error && <p className="text-sm text-destructive">{error}</p>}

                                <div className="flex gap-2 mt-2">
                                    <Button type="submit" disabled={verifying}>
                                        {verifying ? "Verifying..." : "Verify & Enable"}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        onClick={() => {
                                            setShowSetupDialog(false);
                                            setOtpAuthUrl(null);
                                            setSecretBase32(null);
                                            setQrDataUrl(null);
                                            setSetupId(null);
                                            setCode("");
                                            setError(null);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </main>

    );
}

/*
  ------------------------
  Server-side example (pseudo-code, put in app/api/mfa/* routes)
  ------------------------

  // POST /api/mfa/setup
  import { NextResponse } from 'next/server'
  import speakeasy from 'speakeasy'
  import { v4 as uuid } from 'uuid'

  export async function POST(req) {
    // authenticate user (session / token)
    const user = await getUserFromReq(req)
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    // generate temporary secret
    const secret = speakeasy.generateSecret({ name: `E-Wallet:${user.email}` })
    // save temp secret in DB or cache associated with user and a setupId
    const setupId = uuid()
    await db.mfaTemp.create({ userId: user.id, setupId, base32: secret.base32, createdAt: Date.now() })

    return NextResponse.json({ otpauthUrl: secret.otpauth_url, base32: secret.base32, setupId })
  }

  // POST /api/mfa/verify-setup
  export async function POST(req) {
    const { setupId, code } = await req.json()
    // find temp record and user
    const rec = await db.mfaTemp.findOne({ where: { setupId } })
    if (!rec) return NextResponse.json({ message: 'Invalid setup' }, { status: 400 })

    const verified = speakeasy.totp.verify({ secret: rec.base32, encoding: 'base32', token: code, window: 1 })
    if (!verified) return NextResponse.json({ message: 'Invalid code' }, { status: 400 })

    // Save secret permanently to user record (encrypt at rest)
    await db.user.update({ mfaEnabled: true, mfaSecret: rec.base32 }, { where: { id: rec.userId } })
    // delete temp record
    await db.mfaTemp.destroy({ where: { setupId } })

    return NextResponse.json({ success: true })
  }

  // POST /api/mfa/disable
  // verify password + possibly TOTP, then clear mfaSecret and set mfaEnabled=false

  // Login flow example (server-side):
  // - After validating credentials, if user.mfaEnabled === true, return { mfaRequired: true, mfaSessionId }
  // - Client should then navigate to MFA challenge screen and send the 6-digit code with mfaSessionId to complete login

  Security notes:
  - Store TOTP secrets encrypted (not plaintext) at rest.
  - Use rate limiting and lockouts for repeated failed attempts.
  - Provide backup codes for account recovery (one-time use).
*/
