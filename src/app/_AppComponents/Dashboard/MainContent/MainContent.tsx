import { totalType, Transaction } from '@/interfaces/dashboard/dashboard.types';
import React from 'react'


type MainContentPropsType = {
    formatCurrency: (v: number) => string;
    totals: totalType;
    transactions: Transaction[];
    shortDate: (iso: string) => string;
    // setTxModal: React.Dispatch<React.SetStateAction<Transaction | null>>;
}

export default function MainContent({ formatCurrency, totals, transactions, shortDate}: MainContentPropsType) {
    return (
        <>
            <main className="col-span-12 lg:col-span-6 py-2 md:py-0">
                <div className="rounded-2xl p-6 bg-white shadow">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <div className="text-xs text-slate-400">Total Balance</div>
                            <div className="text-3xl font-bold text-slate-900 mt-1">{formatCurrency(totals.total)}</div>
                            <div className="text-sm text-slate-500 mt-2">Available: {formatCurrency(totals.available)} • Pending: {formatCurrency(totals.pending)}</div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-3">
                            <button className="cursor-pointer px-4 py-2 rounded-md bg-emerald-600 text-white">Deposit</button>
                            {/* <button className="cursor-pointer px-4 py-2 rounded-md border">Withdraw</button> */}
                        </div>
                    </div>

                    {/* small chart placeholder */}
                    <div className="mt-6 h-44 bg-gradient-to-r from-white to-slate-50 rounded-xl flex items-center justify-center text-sm text-slate-400">Balance chart </div>

                    <div className="mt-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Recent Transactions</h3>
                            <div className="text-sm text-slate-500">{transactions.length} transactions</div>
                        </div>

                        <div className="mt-4 overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-xs text-slate-500 border-b">
                                        <th className="py-2">Date</th>
                                        <th className="py-2">Description</th>
                                        <th className="py-2">Amount</th>
                                        <th className="py-2">Status</th>
                                        <th className="py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="py-6 text-center text-sm text-slate-500">
                                                No transactions yet for this account
                                            </td>
                                        </tr>
                                    )}
                                    {transactions.map((t) => (
                                        <tr key={t.id} className="border-b last:border-0">
                                            <td className="py-3 text-sm text-slate-600">{shortDate(t.date)}</td>
                                            <td className="py-3 text-sm text-slate-800">{t.description}</td>
                                            <td className={`py-3 text-sm font-medium ${t.amount >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                                                {t.amount >= 0 ?
                                                    `+ ${formatCurrency(t.amount)}` : `- ${formatCurrency(Math.abs(t.amount))}`}
                                            </td>
                                            <td className="py-3 text-sm">
                                                <span className={`px-2 py-1 rounded-full text-xs ${t.status === "success" ? "bg-emerald-100 text-emerald-700" : t.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"
                                                    }`}>{t.status}</span>
                                            </td>
                                            <td className="py-3 text-sm">
                                                {/* <button onClick={() => setTxModal(t)} className="text-blue-600 underline">View</button> */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 flex items-center justify-end gap-2">
                            {/* <button
                                className="cursor-pointer px-3 py-2 rounded-md border">
                                Export
                            </button>
                            <button
                                // onClick={() => loadAll()} 
                                className="cursor-pointer px-3 py-2 rounded-md bg-blue-950 text-white">
                                Refresh
                            </button> */}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
