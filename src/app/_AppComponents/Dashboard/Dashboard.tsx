"use client";

import React, { useState } from "react";
import LeftSidebar from "./LeftSidebar/LeftSidebar";
import MainContent from "./MainContent/MainContent";
import RightSideBar from "./RightSideBar/RightSideBar";
import { Account, Transaction, totalType } from "@/interfaces/dashboard/dashboard.types";

// Helpers
const formatCurrency = (v: number) =>
    new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
    }).format(v);

const shortDate = (iso: string) => {
    try {
        return new Date(iso).toLocaleString("en-US", { timeZone: "UTC" });
    } catch {
        return iso;
    }
};

// Types
type Balance = {
    total: number;
    available: number;
    pending: number;
    locked: number;
};

export default function Dashboard() {
    // Account state
    const [accounts] = useState<Account[]>([]);
    const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

    // Data state
    const [balance] = useState<Balance | null>(null);
    const [transactions] = useState<Transaction[]>([]);

    // UI state
    // const [loading, setLoading] = useState(true);
    // const [txModal, setTxModal] = useState<Transaction | null>(null);

    // Derived totals
    const totals: totalType = {
        total: balance?.total ?? 0,
        available: balance?.available ?? 0,
        pending: balance?.pending ?? 0,
        locked: balance?.locked ?? 0,
    };

    // if (loading) {
    //     return (
    //         <div className="min-h-screen bg-white-950 text-white">
    //             <div className="container mx-auto p-6">
    //                 <div className="animate-pulse space-y-4">
    //                     <div className="h-40 bg-blue-950/80 rounded-2xl" />
    //                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
    //                         <div className="h-28 bg-blue-950/80 rounded-xl" />
    //                         <div className="h-28 bg-blue-950/80 rounded-xl" />
    //                         <div className="h-28 bg-blue-950/80 rounded-xl" />
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="min-h-screen bg-slate-50 py-24">
            {/* <TopNav /> */}
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-12 gap-6">
                    {/* Sidebar */}
                    <LeftSidebar
                        accounts={accounts}
                        selectedAccountId={selectedAccountId}
                        setCreateAccountOpen={() => { }}
                        setSelectedAccountId={setSelectedAccountId}
                        formatCurrency={formatCurrency}
                    />

                    {/* Main */}
                    <MainContent
                        totals={totals}
                        formatCurrency={formatCurrency}
                        transactions={transactions}
                        shortDate={shortDate}
                        // setTxModal={setTxModal}
                    />

                    {/* Right */}
                    <RightSideBar />
                </div>
            </div>
        </div>
    );
}

// ---------- Top navigation ----------
// function TopNav() {
//   return (
//     <header className="bg-blue-950 text-white">
//       <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//         <div className="flex items-center gap-6">
//           <div className="text-xl font-semibold">E-Wallet</div>
//           <nav className="hidden md:flex items-center gap-4 text-sm text-white/80">
//             <a className="hover:underline">Home</a>
//             <a className="hover:underline">Accounts</a>
//             <a className="hover:underline">Transactions</a>
//             <a className="hover:underline">Verification</a>
//           </nav>
//         </div>
//         <div className="flex items-center gap-3">
//           <input
//             placeholder="Search transactions"
//             className="hidden md:inline-block rounded-md px-3 py-2 text-sm text-slate-800"
//           />
//           <button className="px-3 py-2 rounded-md bg-white/10">Notifications</button>
//           <div className="px-3 py-2 rounded-md bg-white/6">User</div>
//         </div>
//       </div>
//     </header>
//   );
// }
