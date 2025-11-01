import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';
import { CopyOutlined } from '@ant-design/icons';
import React, { memo } from 'react'


type QrSectionPropsType = {
    qrDataUrl: string | null;
    secretBase32: string | null
    isCopied: boolean;
    handleCopy(): void;
}

function QrSection({ qrDataUrl, secretBase32, isCopied, handleCopy }: QrSectionPropsType) {
    return (
        <>
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

                                onClick={() => handleCopy()

                                }
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
        </>
    )
}


export default memo(QrSection);