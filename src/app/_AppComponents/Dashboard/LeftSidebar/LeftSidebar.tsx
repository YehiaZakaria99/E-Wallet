import React from 'react';
import Pill from './Pill';
import { Account } from '@/interfaces/dashboard/dashboard.types';




type LeftSidebarPropsType = {
    accounts: Account[];
    selectedAccountId: string | null;
    setCreateAccountOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedAccountId: React.Dispatch<React.SetStateAction<string | null>>;
    formatCurrency: (v: number) => string;
}

function LeftSidebarComponent({ accounts, selectedAccountId, setCreateAccountOpen, setSelectedAccountId, formatCurrency }: LeftSidebarPropsType) {
    return (
        <>
            <aside className="col-span-12 lg:col-span-3 py-2 md:py-0">
                <div className="sticky top-6 space-y-4">
                    <div className="rounded-2xl bg-white shadow p-4">

                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-xs text-slate-400">Welcome back</div>
                                <div className="font-semibold text-lg text-slate-900">User</div>
                            </div>
                            <div className="text-sm">
                                <Pill>Verified</Pill>
                            </div>
                        </div>

                        <div className="mt-4">
                            <button
                                onClick={() => setCreateAccountOpen(true)}
                                className="cursor-pointer w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-950 text-white">
                                Create Account
                            </button>
                        </div>
                    </div>



                    <div className="rounded-2xl bg-white shadow p-4">
                        <div className="text-sm text-slate-600 font-medium mb-3">Accounts</div>
                        <div className="space-y-3">
                            {accounts.length === 0 && <div className="text-sm text-slate-500">No accounts yet</div>}
                            {accounts.map((acc) => (
                                <button
                                    key={acc.id}
                                    onClick={() => setSelectedAccountId(acc.id)}
                                    className={`w-full text-left p-3 rounded-lg border ${acc.id === selectedAccountId ? "border-blue-600 bg-blue-50" : "border-transparent"
                                        }`}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm font-medium text-slate-900">
                                                {acc.name}
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                {acc.type ?? "Wallet"}
                                            </div>
                                        </div>
                                        <div className="text-sm font-semibold text-slate-800">
                                            {formatCurrency(acc.balance)}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white shadow p-4">
                        <div className="text-sm text-slate-600 font-medium mb-3">Quick Actions</div>
                        <div className="flex flex-wrap gap-2">
                            <button className="cursor-pointer px-3 py-2 rounded-lg bg-white border">Deposit</button>
                            <button className="cursor-pointer px-3 py-2 rounded-lg bg-white border">Withdraw</button>
                            <button className="cursor-pointer px-3 py-2 rounded-lg bg-white border">Transfer</button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}

const LeftSidebar = React.memo(LeftSidebarComponent)

export default LeftSidebar;