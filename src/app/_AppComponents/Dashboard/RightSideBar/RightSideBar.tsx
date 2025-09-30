import { Badge } from '@/components/ui/badge'
import { useAppSelector } from '@/lib/redux/hooks';
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

export default function RightSideBar() {

    const { isIdVerified } = useAppSelector((state) => state.verificationReducer);
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            <aside className="col-span-12 lg:col-span-3">
                <div className="space-y-4 sticky top-6">
                    {/* <div className="rounded-2xl bg-white shadow p-4">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-slate-600">Account Summary</div>
                                    <div className="text-xs text-slate-500">{accounts.length} accounts</div>
                                </div>

                                <div className="mt-4 grid gap-3">
                                    {accounts.slice(0, 3).map((a) => (
                                        <div key={a.id} className="p-3 rounded-lg border">
                                            <div className="flex items-center justify-between">
                                                <div className="text-sm font-medium">{a.name}</div>
                                                <div className="text-sm font-semibold">{formatCurrency(a.balance)}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 text-sm text-slate-500">View all accounts in the sidebar</div>
                            </div> */}

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
                                // className={`bg-green-500`}
                                >
                                    {isIdVerified
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
