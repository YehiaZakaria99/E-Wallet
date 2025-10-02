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
        // <aside className="hidden lg:flex col-span-2 min-h-screen bg-white border-r shadow-sm">
            <div className=" space-y-4 bg-slate-50 my-5">
                <div className="rounded-2xl bg-white shadow-sm p-5 ">
                    <h4 className="text-sm font-medium text-gray-800 mb-2">
                        Verification
                    </h4>
                    <p className="text-sm text-gray-500 mb-4">
                        Complete verification to lift withdrawal limits.
                    </p>

                    {/* Phone Verify */}
                    <div className="flex justify-between items-center py-6 border-b last:border-0">
                        <Link
                            href="/verification/verify-phone"
                            className="cursor-pointer px-3 py-2 rounded-md bg-blue-950 text-white hover:bg-blue-900 transition"
                        >
                            Verify Phone
                        </Link>
                        <Badge variant="destructive">Not Verified</Badge>
                    </div>

                    {/* ID Verify */}
                    <div className="flex justify-between items-center py-2">
                        <Link
                            href="/verification/verify-id"
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
        // </aside>
    );
}
