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


import { toDataURL } from "qrcode";
import { CopyOutlined, KeyOutlined, SafetyOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { cn } from "@/lib/utils";

export default function Settings() {
    const [mfaEnabled, setMfaEnabled] = useState<boolean | null>(null); // null -> loading
    const [loading, setLoading] = useState(false);

    // setup state
    const [showSetupDialog, setShowSetupDialog] = useState(false);
    const [otpauthUrl, setOtpAuthUrl] = useState<string | null>(null);
    const [secretBase32, setSecretBase32] = useState<string | null>("JRDE2RKUMEZSUNLIMV5SMSJDGIVDORC6NNKSSPREPE4G6XLTN43Q");
    const [isCopied, setIsCopied] = useState(false);
    const [qrDataUrl, setQrDataUrl] = useState<string | null>("data:image/png;base64,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");
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

    // async function openSetup() {
    //     setError(null);
    //     setLoading(true);
    //     try {
    //         const res = await fetch("/api/mfa/setup", { method: "POST" });
    //         if (!res.ok) throw new Error("Failed to create MFA setup");
    //         const data = await res.json();
    //         // expected: { otpauthUrl, base32, setupId }
    //         setOtpAuthUrl(data.otpauthUrl || data.otpauth_url);
    //         setSecretBase32(data.base32 || data.secret || null);
    //         setSetupId(data.setupId || data.setup_id || null);
    //         setShowSetupDialog(true);
    //     } catch (e) {
    //         console.error(e);
    //         setError("Unable to start MFA setup. Try again later.");
    //     } finally {
    //         setLoading(false);
    //     }
    // }
    async function openSetup() {
        setShowSetupDialog(true);
        // setError(null);
        // setLoading(true);
        // try {
            // const res = await fetch("/api/mfa/setup", { method: "POST" });
            // if (!res.ok) throw new Error("Failed to create MFA setup");
            // const data = await res.json();
            // // expected: { otpauthUrl, base32, setupId }
            // setOtpAuthUrl(data.otpauthUrl || data.otpauth_url);
            // setSecretBase32(data.base32 || data.secret || null);
            // setSetupId(data.setupId || data.setup_id || null);
        // } catch (e) {
        //     console.error(e);
        //     setError("Unable to start MFA setup. Try again later.");
        // } finally {
        //     setLoading(false);
        // }
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


    function handleCopy() {
        secretBase32 && navigator.clipboard.writeText(secretBase32);
        setIsCopied(true);
    }

    return (
        <main className="p-6 max-w-5xl mx-auto md:pt-24 pt-32">
            <div className="mb-10 border-b pb-4 text-center md:text-left">
                <div className="text-blue-950 flex items-center justify-center md:justify-start gap-2">
                    <span className="text-xl"><SettingOutlined /></span>
                    <h1 className="text-3xl font-bold">
                        Settings
                    </h1>
                </div>
                <p className="text-muted-foreground mt-1">Manage your account security and preferences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Security Card */}
                <div className="md:col-span-2 md:h-80  order-2">
                    <Card className="shadow-lg border rounded-2xl h-full flex flex-col justify-center space-y-10">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-xl">
                                    <SafetyOutlined />
                                </span>
                                <span className="text-xl">Security</span>
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
                <div className="md:h-80  order-1">
                    <Card className="shadow-md h-full border rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2 text-blue-950">
                                <span className=""><UserOutlined /></span>
                                <span className="font-bold ">
                                    Account
                                </span>
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
                <DialogContent className="dialog-button rounded-2xl md:h-auto md:my-8 w-full max-w-2xl h-[500px] overflow-auto my-12">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-blue-950 flex items-center gap-2">
                            <KeyOutlined /> Set up Authenticator
                        </DialogTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Protect your wallet with two-factor authentication.
                        </p>
                    </DialogHeader>

                    <div className="mt-6 grid grid-cols-1 gap-6">
                        {/* QR Section */}
                        <Card className="p-4 flex flex-col md:flex-row items-center gap-6 shadow-md border">
                            {qrDataUrl ? (
                                <img
                                    src={qrDataUrl}
                                    alt="MFA QR code"
                                    className="md:w-1/2 h-48 object-cover bg-white p-2 rounded-lg shadow"
                                />
                            ) : (
                                <div className="md:w-1/2 h-48 bg-muted/30 rounded-md flex items-center justify-center text-muted-foreground">
                                    QR
                                </div>
                            )}

                            {secretBase32 && (
                                <div className="flex flex-col gap-3 md:w-1/2 md:w-">
                                    <Label className="text-blue-950 font-medium">Secret key</Label>
                                    <div className="flex gap-2 items-center">
                                        <Input value={secretBase32} readOnly className="font-mono tracking-wider selection:bg-blue-950 " />
                                        <Button
                                            className="cursor-pointer relative group "
                                            variant="outline"
                                            size="icon"

                                            onClick={() => handleCopy()}
                                        >
                                            <CopyOutlined />
                                            <p className={cn(
                                                "text-xs absolute text-white p-1 rounded-md -top-6 opacity-0 pointer-events-none",
                                                "duration-300 group-hover:opacity-100 ",
                                                !isCopied && "bg-blue-950",
                                                isCopied && "bg-green-700",
                                            )}
                                            >
                                                {!isCopied && "Copy to clipboard"}
                                                {isCopied && "Copied"}
                                            </p>
                                        </Button>

                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        If you can’t scan the QR, copy and paste this key into your authenticator app.
                                    </p>
                                </div>
                            )}
                        </Card>

                        {/* Verification Section */}
                        <Card className="p-4 shadow-md border">
                            <form onSubmit={verifySetup} className="flex flex-col gap-4">
                                <div>
                                    <Label className="text-blue-950 font-medium">Verification code</Label>
                                    <Input
                                        className="mt-2 text-center tracking-[0.3em] font-bold text-lg"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        maxLength={6}
                                        placeholder="••••••"
                                    />
                                </div>

                                {error && <p className="text-sm text-destructive">{error}</p>}

                                <div className="flex gap-2 mt-1">
                                    <Button className="cursor-pointer bg-blue-950 hover:bg-blue-900" type="submit" disabled={verifying}>
                                        {verifying ? "Verifying..." : "Verify & Enable"}
                                    </Button>
                                    <Button
                                        className="cursor-pointer"
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
                        </Card>
                    </div>
                </DialogContent>
            </Dialog>
        </main>

    );
}

