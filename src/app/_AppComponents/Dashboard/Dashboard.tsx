"use client"

import React, { useEffect, useMemo, useState } from "react";
import LeftSidebar from "./LeftSidebar/LeftSidebar";
import AccountModal from "./Modal/AccountModal";
import MainContent from "./MainContent/MainContent";
import { Account, totalType, Transaction } from "@/interfaces/dashboard/dashboard.types";

// Dashboard component (single-file) - TailwindCSS
// ملاحظات:
// - هذا الملف مصمم ليعمل مباشرة داخل مشروع Next.js + Tailwind.
// - استبدل نداءات الـ fetch بنقاط النهاية الحقيقية عندك (مثال: /api/wallet/balance).
// - يمكنك لاحقًا تحويل fetch إلى react-query / swr بحسب تفضيلك.

// ---------- Types ----------



type Balance = {
    total: number;
    available: number;
    pending: number;
    locked: number;
};

// ---------- Helper utilities ----------
const formatCurrency = (v: number) => {
    return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
    }).format(v);
};

const shortDate = (iso: string) => {
    try {
        return new Date(iso).toLocaleString();
    } catch {
        return iso;
    }
};

// ---------- API placeholders ----------
// async function fetchBalance(): Promise<Balance> {
//     const res = await fetch("/api/wallet/balance");
//     if (!res.ok) throw new Error("Failed fetching balance");
//     return res.json();
// }

// async function fetchAccounts(): Promise<Account[]> {
//     const res = await fetch("/api/accounts");
//     if (!res.ok) throw new Error("Failed fetching accounts");
//     return res.json();
// }

// async function fetchTransactions(accountId?: string): Promise<Transaction[]> {
//     const query = accountId ? `?accountId=${accountId}` : "";
//     const res = await fetch(`/api/transactions${query}`);
//     if (!res.ok) throw new Error("Failed fetching transactions");
//     return res.json();
// }

// async function createNewAccount(payload: { name: string; type?: string }) {
//     const res = await fetch(`/api/accounts`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//     });
//     if (!res.ok) throw new Error("Failed creating account");
//     return res.json();
// }

// ---------- Small UI primitives (self-contained, no external libs) ----------
function IconWrapper({ children }: { children: React.ReactNode }) {
    return <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/6">{children}</div>;
}

function Pill({ children }: { children: React.ReactNode }) {
    return <span className="px-2 py-1 rounded-full bg-white/5 text-sm">{children}</span>;
}

// ---------- Main Dashboard Component ----------
export default function Dashboard() {


    // Account (LeftSidebar)
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [createAccountOpen, setCreateAccountOpen] = useState(false);
    const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
    const [creatingAccount, setCreatingAccount] = useState<boolean>(false);
    const [newAccountName, setNewAccountName] = useState<string>("");
    // data states
    const [balance, setBalance] = useState<Balance | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    // UI states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [txModal, setTxModal] = useState<Transaction | null>(null);


    // fetch all data (MVP-style) — يمكنك إستبداله بـ react-query لاحقًا
    // const loadAll = async () => {
    //     setLoading(true);
    //     setError(null);
    //     try {
    //         const [bal, accs] = await Promise.all([fetchBalance(), fetchAccounts()]);
    //         setBalance(bal);
    //         setAccounts(accs || []);

    //         // اختر الحساب الافتراضي (first) أو null
    //         const defaultAccountId = accs?.[0]?.id ?? null;
    //         setSelectedAccountId(defaultAccountId);

    //         // fetch transactions for default
    //         const txs = await fetchTransactions(defaultAccountId ?? undefined);
    //         setTransactions(txs || []);
    //     } catch (err: any) {
    //         setError(err?.message ?? "Unknown error");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     loadAll();
    //     // OPTIONAL: poll every 30s
    //     const t = setInterval(loadAll, 30000);
    //     return () => clearInterval(t);
    // }, []);

    // when selected account changes, re-fetch transactions only
    // useEffect(() => {
    //     if (!selectedAccountId) return;
    //     let cancelled = false;
    //     (async () => {
    //         try {
    //             const txs = await fetchTransactions(selectedAccountId);
    //             if (!cancelled) setTransactions(txs || []);
    //         } catch (e) {
    //             // ignore — could set a local error
    //         }
    //     })();
    //     return () => {
    //         cancelled = true;
    //     };
    // }, [selectedAccountId]);



    const totals: totalType = useMemo(() => {
        return {
            total: balance?.total ?? 0,
            available: balance?.available ?? 0,
            pending: balance?.pending ?? 0,
            locked: balance?.locked ?? 0,
        };
    }, [balance]);

    // create account handler
    // const handleCreateAccount = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     if (!newAccountName.trim()) return;
    //     setCreatingAccount(true);
    //     try {
    //         await createNewAccount({ name: newAccountName });
    //         setNewAccountName("");
    //         setCreateAccountOpen(false);
    //         await loadAll(); // refetch
    //     } catch (err: any) {
    //         alert(err?.message ?? "Failed");
    //     } finally {
    //         setCreatingAccount(false);
    //     }
    // };

    // UI skeleton / empty state helpers
    if (loading) {
        return (
            <div className="min-h-screen bg-blue-950 text-white">
                <TopNav />
                <div className="container mx-auto p-6">
                    <div className="animate-pulse space-y-4">
                        <div className="h-40 bg-white/6 rounded-2xl" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="h-28 bg-white/6 rounded-xl" />
                            <div className="h-28 bg-white/6 rounded-xl" />
                            <div className="h-28 bg-white/6 rounded-xl" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }






    return (
        <div className="min-h-screen bg-slate-50">
            <TopNav />
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-12 gap-6">
                    {/* Sidebar */}
                    <LeftSidebar
                        accounts={accounts}
                        selectedAccountId={selectedAccountId}
                        setCreateAccountOpen={setCreateAccountOpen}
                        setSelectedAccountId={setSelectedAccountId}
                        formatCurrency={formatCurrency}
                    />

                    {/* Main content */}

                    <MainContent
                        totals={totals}
                        formatCurrency={formatCurrency}
                        transactions={transactions}
                        shortDate={shortDate}
                        setTxModal={setTxModal}
                    />





                    {/* Right column */}
                    {/* <aside className="col-span-12 lg:col-span-3">
                        <div className="space-y-4 sticky top-6">
                            <div className="rounded-2xl bg-white shadow p-4">
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
                            </div>

                            <div className="rounded-2xl bg-white shadow p-4">
                                <div className="text-sm text-slate-600">Alerts & Verification</div>
                                <div className="mt-3 text-sm text-slate-500">Complete verification to lift withdrawal limits.</div>
                                <div className="mt-3">
                                    <button className="px-3 py-2 rounded-md bg-blue-950 text-white w-full">Complete Verification</button>
                                </div>
                            </div>
                        </div>
                    </aside> */}
                </div>
            </div>

            {/* Modals */}


            {/* {txModal && (
                <Modal onClose={() => setTxModal(null)}>
                    <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2">Transaction Details</h3>
                        <div className="text-sm text-slate-600 mb-4">{shortDate(txModal.date)}</div>
                        <div className="grid gap-2">
                            <div className="flex justify-between"><div className="text-sm text-slate-500">Description</div><div className="text-sm">{txModal.description}</div></div>
                            <div className="flex justify-between"><div className="text-sm text-slate-500">Amount</div><div className={`text-sm font-medium ${txModal.amount >= 0 ? "text-emerald-600" : "text-rose-600"}`}>{formatCurrency(txModal.amount)}</div></div>
                            <div className="flex justify-between"><div className="text-sm text-slate-500">Status</div><div className="text-sm">{txModal.status}</div></div>
                        </div>
                        <div className="mt-6 flex justify-end gap-2">
                            <button onClick={() => setTxModal(null)} className="px-3 py-2 rounded-md border">Close</button>
                        </div>
                    </div>
                </Modal>
            )} */}

            {createAccountOpen && (
                <AccountModal
                    creatingAccount={creatingAccount}
                    newAccountName={newAccountName}
                    setCreateAccountOpen={setCreateAccountOpen}
                    setNewAccountName={setNewAccountName}
                />
                // <Modal onClose={() => setCreateAccountOpen(false)}>
                //     <div className="p-6 w-full max-w-md">
                //         <h3 className="text-lg font-semibold mb-2">Create New Account</h3>
                //         <form
                //             // onSubmit={handleCreateAccount}
                //             className="space-y-4">
                //             <div>
                //                 <label className="block text-sm text-slate-600">Account Name</label>
                //                 <input
                //                     value={newAccountName}
                //                     onChange={(e) => setNewAccountName(e.target.value)}
                //                     className="mt-1 w-full rounded-md border px-3 py-2"
                //                     placeholder="e.g. Savings"
                //                 />
                //             </div>

                //             <div className="flex justify-end gap-2">
                //                 <button type="button" onClick={() => setCreateAccountOpen(false)} className="px-3 py-2 rounded-md border">Cancel</button>
                //                 <button type="submit" className="px-4 py-2 rounded-md bg-blue-950 text-white">{creatingAccount ? "Creating..." : "Create"}</button>
                //             </div>
                //         </form>
                //     </div>
                // </Modal>
            )}
        </div>
    );
}

// ---------- Small Modal primitive ----------
// function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
//     useEffect(() => {
//         const onKey = (e: KeyboardEvent) => {
//             if (e.key === "Escape") onClose();
//         };
//         document.addEventListener("keydown", onKey);
//         return () => document.removeEventListener("keydown", onKey);
//     }, [onClose]);

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//             <div className="absolute inset-0 bg-black/50" onClick={() => onClose()} />
//             <div className="relative z-10 w-full max-w-2xl mx-4">{children}</div>
//         </div>
//     );
// }

// ---------- Top navigation ----------
function TopNav() {
    return (
        <header className="bg-blue-950 text-white">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="text-xl font-semibold">E-Wallet</div>
                    <nav className="hidden md:flex items-center gap-4 text-sm text-white/80">
                        <a className="hover:underline">Home</a>
                        <a className="hover:underline">Accounts</a>
                        <a className="hover:underline">Transactions</a>
                        <a className="hover:underline">Verification</a>
                    </nav>
                </div>

                <div className="flex items-center gap-3">
                    <input placeholder="Search transactions" className="hidden md:inline-block rounded-md px-3 py-2 text-sm text-slate-800" />
                    <button className="px-3 py-2 rounded-md bg-white/10">Notifications</button>
                    <div className="px-3 py-2 rounded-md bg-white/6">User</div>
                </div>
            </div>
        </header>
    );
}

