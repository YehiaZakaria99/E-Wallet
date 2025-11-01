import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { memo } from 'react'

type VerificationSectionPropsType = {
    setShowSetupDialog: React.Dispatch<React.SetStateAction<boolean>>;
    setSecretBase32: React.Dispatch<React.SetStateAction<string | null>>;
    setQrDataUrl: React.Dispatch<React.SetStateAction<string | null>>;
}


function VerificationSection({ setShowSetupDialog, setSecretBase32, setQrDataUrl }: VerificationSectionPropsType) {
    return (
        <>
            <Card className="p-4 shadow-md border">
                <form className="flex flex-col gap-4">
                    <div>
                        <Label className="text-blue-950 font-medium">Verification code</Label>
                        <Input
                            className="mt-2 text-center tracking-[0.3em] font-bold text-lg"
                            // value={code}
                            // onChange={(e) => setCode(e.target.value)}
                            maxLength={6}
                            placeholder="••••••"
                        />
                    </div>

                    {/* {error && <p className="text-sm text-destructive">{error}</p>} */}

                    <div className="flex gap-2 mt-1">
                        <Button className="cursor-pointer bg-blue-950 hover:bg-blue-900" type="submit"
                        // disabled={verifying}
                        >
                            {/* {verifying ? "Verifying..." : "Verify & Enable"} */}
                            Verify & Enable
                        </Button>
                        <Button
                            className="cursor-pointer"
                            variant="ghost"
                            onClick={() => {
                                setShowSetupDialog(false);
                                setSecretBase32(null);
                                setQrDataUrl(null);
                                // setOtpAuthUrl(null);
                                // setSetupId(null);
                                // setCode("");
                                // setError(null);
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Card>
        </>
    )
}


export default memo(VerificationSection);
