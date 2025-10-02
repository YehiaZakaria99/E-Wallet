import { totalType, Transaction } from '@/interfaces/dashboard/dashboard.types';
import { cn } from '@/lib/utils';
import React from 'react'


type MainContentPropsType = {
    formatCurrency: (v: number) => string;
    totals: totalType;
    transactions: Transaction[];
    shortDate: (iso: string) => string;
    // setTxModal: React.Dispatch<React.SetStateAction<Transaction | null>>;
}

export default function MainContent({ formatCurrency, totals, transactions, shortDate }: MainContentPropsType) {
    return (
        <main className="col-span-12 lg:col-span-6">
            <div className="rounded-2xl p-6 bg-white shadow-sm border">
                {/* Balance Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <p className="text-xs text-muted-foreground">Total Balance</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">
                            {formatCurrency(totals.total)}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Available: {formatCurrency(totals.available)} • Pending:{" "}
                            {formatCurrency(totals.pending)}
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <button className="cursor-pointer px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition">
                            Deposit
                        </button>
                        {/* <button className="cursor-pointer px-4 py-2 rounded-md border">Withdraw</button> */}
                    </div>
                </div>

                {/* Balance chart placeholder */}
                <div className="mt-6 h-44 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl flex items-center justify-center text-sm text-slate-400">
                    Balance chart
                </div>

                {/* Recent Transactions */}
                <div className="mt-8">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold">Recent Transactions</h3>
                        <span className="text-sm text-gray-500">{transactions.length} transactions</span>
                    </div>

                    <div className="overflow-x-auto rounded-lg border">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50">
                                <tr className="text-xs text-gray-500 border-b">
                                    <th className="py-3 px-4">Date</th>
                                    <th className="py-3 px-4">Description</th>
                                    <th className="py-3 px-4">Amount</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="py-8 text-center text-sm text-gray-500"
                                        >
                                            No transactions yet for this account
                                        </td>
                                    </tr>
                                )}
                                {transactions.map((t) => (
                                    <tr key={t.id} className="border-b last:border-0 hover:bg-slate-50">
                                        <td className="py-3 px-4 text-slate-600">{shortDate(t.date)}</td>
                                        <td className="py-3 px-4 text-slate-800">{t.description}</td>
                                        <td
                                            className={cn(
                                                "py-3 px-4 font-medium",
                                                t.amount >= 0 ? "text-emerald-600" : "text-rose-600"
                                            )}
                                        >
                                            {t.amount >= 0
                                                ? `+ ${formatCurrency(t.amount)}`
                                                : `- ${formatCurrency(Math.abs(t.amount))}`}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={cn(
                                                    "px-2 py-1 rounded-full text-xs font-medium",
                                                    t.status === "success"
                                                        ? "bg-emerald-100 text-emerald-700"
                                                        : t.status === "pending"
                                                            ? "bg-amber-100 text-amber-700"
                                                            : "bg-rose-100 text-rose-700"
                                                )}
                                            >
                                                {t.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-blue-600 text-sm">
                                            {/* <button onClick={() => setTxModal(t)} className="underline">View</button> */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Actions */}
                    {/* <div className="mt-4 flex items-center justify-end gap-2">
            <button className="cursor-pointer px-3 py-2 rounded-md border">Export</button>
            <button className="cursor-pointer px-3 py-2 rounded-md bg-blue-600 text-white">Refresh</button>
          </div> */}
                </div>
            </div>
        </main>
    );
}

