import { Badge } from '@/components/ui/badge'
import { useKycStatus } from '@/hooks/useKycStatus';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setIsIdVerified } from '@/lib/redux/slices/verification/verificationSlice';
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

export default function RightSideBar() {
    const { isIdVerified } = useAppSelector((state) => state.verificationReducer);
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const dispatch = useAppDispatch();
    const { data, isLoading } = useKycStatus();

    React.useEffect(() => {
        if (data?.message === "KYC approved") {
            dispatch(setIsIdVerified(true));
        } else {
            dispatch(setIsIdVerified(false));
        }
    }, [data, dispatch]);

    return (
        <div className="w-full my-5 ">
            <div className="rounded-2xl bg-white shadow-sm p-5 space-y-5">
                <div>
                    <h4 className="text-sm font-medium text-gray-800 mb-1">
                        Verification
                    </h4>
                    <p className="text-xs text-gray-500">
                        Complete verification to lift withdrawal limits.
                    </p>
                </div>

                {/* Phone Verify */}
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <Link
                        href="/dashboard/verify-phone"
                        className="cursor-pointer px-3 py-2 rounded-md bg-blue-950 text-white hover:bg-blue-900 transition"
                    >
                        Verify Phone
                    </Link>
                    <Badge variant="destructive">Not Verified</Badge>
                </div>

                {/* ID Verify */}
                <div className="flex justify-between items-center py-3">
                    <Link
                        href="/dashboard/verify-id"
                        className={cn(
                            "cursor-pointer px-3 py-2 rounded-md bg-blue-950 text-white hover:bg-blue-900 transition",
                            isIdVerified && "pointer-events-none cursor-not-allowed opacity-50"
                        )}
                    >
                        Verify ID
                    </Link>

                    {isMounted && (
                        <Badge variant={isIdVerified ? "success" : "destructive"}>
                            {isLoading
                                ? "Checking..."
                                : isIdVerified
                                    ? "Verified"
                                    : "Not Verified"}
                        </Badge>
                    )}
                </div>
            </div>
        </div>
    );
}
