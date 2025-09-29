"use client"

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'


// type VerifyIdCardPropsType = {
//     idVerified: boolean;
//     setIdVerified: React.Dispatch<React.SetStateAction<boolean>>;
// }

export default function VerifyIdCard() {
    const [idVerified, setIdVerified] = useState(false)
    return (
        <>
            <Card className="shadow-md">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>ID Card Verification</CardTitle>
                    <Badge variant={idVerified ? "secondary" : "destructive"}>
                        {idVerified ? "Verified" : "Not Verified"}
                    </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Input type="file" />
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button
                        onClick={() => setIdVerified(true)}
                        disabled={idVerified}
                        className="bg-blue-950 hover:bg-blue-900"
                    >
                        {idVerified ? "Verified" : "Upload & Verify"}
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}
