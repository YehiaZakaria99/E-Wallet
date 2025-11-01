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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";


import { toDataURL } from "qrcode";
import { CopyOutlined, KeyOutlined, SafetyOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { cn } from "@/lib/utils";
import MFADialog from "../MFADialog/MFADialog";

export default function Settings() {
    const [mfaEnabled, setMfaEnabled] = useState<boolean | null>(null); // null -> loading
    const [loading, setLoading] = useState(false);

    // setup state
    const [showSetupDialog, setShowSetupDialog] = useState(false);
    const [otpauthUrl, setOtpAuthUrl] = useState<string | null>(null);
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
            // setSecretBase32(null);
            // setQrDataUrl(null);
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
        <main className="p-6 max-w-5xl mx-auto md:pt-12 pt-32">
            <div className="mb-10 border-b pb-4 text-center md:text-left">
                <div className="text-blue-950 flex items-center justify-center md:justify-start gap-2">
                    <span className="text-xl"><SettingOutlined /></span>
                    <h1 className="text-3xl font-bold">
                        Settings
                    </h1>
                </div>
                <p className="text-muted-foreground mt-1">Manage your account security and preferences</p>
            </div>

            <div className="grid grid-cols-1  gap-8">
                {/* Security Card */}
                <div className="md:col-span-2 md:h-80 ">
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
                {/* <div className="md:h-80  ">
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
                </div> */}
            </div>

            {/* MFA Setup Dialog */}
            <MFADialog showSetupDialog={showSetupDialog} setShowSetupDialog={setShowSetupDialog} />
        </main>

    );
}

