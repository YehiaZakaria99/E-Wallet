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
        <div className="min-h-screen bg-slate-50 py-12">
            {/* <TopNav /> */}
            <div className="container mx-auto px-4">
                <div className="gap-6">
                    {/* Main */}
                    <main className=" p-6">
                        <MainContent
                            totals={totals}
                            formatCurrency={formatCurrency}
                            transactions={transactions}
                            shortDate={shortDate}
                        // setTxModal={setTxModal}
                        />
                    </main>
                </div>
            </div>
        </div>
    );
}


