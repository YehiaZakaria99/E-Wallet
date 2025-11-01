import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { CopyOutlined, KeyOutlined } from '@ant-design/icons';
import QrSection from './QrSection';
import VerificationSection from './VerificationSection';


type MFADialogPropsType = {
    showSetupDialog: boolean;
    setShowSetupDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MFADialog({ showSetupDialog, setShowSetupDialog }: MFADialogPropsType) {

    const [isCopied, setIsCopied] = useState(false);
    const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
    const [secretBase32, setSecretBase32] = useState<string | null>("Ay Haga");


    // useEffect(() => {
    //     // when otpauthUrl is set, create QR data url
    //     if (!otpauthUrl) return;
    //     let mounted = true;
    //     (async () => {
    //         try {
    //             const dataUrl = await toDataURL(otpauthUrl);
    //             if (mounted) setQrDataUrl(dataUrl);
    //         } catch (e) {
    //             console.error("QR generation failed", e);
    //             if (mounted) setQrDataUrl(null);
    //         }
    //     })();
    //     return () => { mounted = false };
    // }, [otpauthUrl]);

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


    function handleCopy() {
        secretBase32 && navigator.clipboard.writeText(secretBase32);
        setIsCopied(true);
    }

    return (
        <>
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
                        <QrSection qrDataUrl={qrDataUrl} secretBase32={secretBase32} isCopied={isCopied} handleCopy={handleCopy} />

                        {/* Verification Section */}
                        <VerificationSection setShowSetupDialog={setShowSetupDialog} setSecretBase32={setSecretBase32} setQrDataUrl={setQrDataUrl} />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
