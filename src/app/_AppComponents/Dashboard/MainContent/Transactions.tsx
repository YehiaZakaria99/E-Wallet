import React from 'react'

export default function Transactions() {
  return (
    <>
     {/* <div className="mt-6">
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
                                                <button onClick={() => setTxModal(t)} className="text-blue-600 underline">View</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 flex items-center justify-end gap-2">
                            <button
                                className="cursor-pointer px-3 py-2 rounded-md border">
                                Export
                            </button>
                            <button
                                // onClick={() => loadAll()} 
                                className="cursor-pointer px-3 py-2 rounded-md bg-blue-950 text-white">
                                Refresh
                            </button>
                        </div>
                    </div> */} 
    </>
  )
}
