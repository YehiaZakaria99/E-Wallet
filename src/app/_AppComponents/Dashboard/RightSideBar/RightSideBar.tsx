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
        <>
            <aside className="col-span-12 lg:col-span-3">
                <div className="space-y-4 sticky top-6">

                    <div className="rounded-2xl bg-white shadow p-4 overflow-auto">
                        {/* <div className="text-sm text-slate-600">Alerts & Verification</div> */}
                        <div className="my-3 text-sm text-slate-500">
                            Complete verification to lift withdrawal limits.
                        </div>
                        <div className="phone-verify py-3 flex justify-between items-center">
                            <Link
                                href={"./verification/verify-phone"}
                                className={cn(
                                    "cursor-pointer px-3 py-2 rounded-md bg-blue-950 text-white",
                                    "hover:bg-blue-900 transition-all duration-300",
                                    // "disabled-link"
                                )}
                            >
                                Verify Phone
                            </Link>

                            <Badge variant={"destructive"}>
                                {"Not Verified"}
                            </Badge>
                        </div>
                        <div className="phone-verify py-3 flex justify-between items-center">
                            <Link
                                href={"./verification/verify-id"}
                                className={cn(
                                    "cursor-pointer px-3 py-2 rounded-md bg-blue-950 text-white",
                                    "hover:bg-blue-900 transition-all duration-300",
                                    isIdVerified && "pointer-events-none cursor-not-allowed opacity-50"
                                )}
                            >
                                Verify ID
                            </Link>

                            {isMounted && (
                                <Badge
                                    variant={isIdVerified ? "success" : "destructive"}
                                >
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
            </aside>
        </>
    )
}
