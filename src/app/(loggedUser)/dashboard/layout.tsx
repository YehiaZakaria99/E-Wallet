"use client"

import LeftSidebar from "@/app/_AppComponents/Dashboard/LeftSidebar/LeftSidebar";
import RightSideBar from "@/app/_AppComponents/Dashboard/RightSideBar/RightSideBar";
import React from "react";
// import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen grid grid-cols-12 bg-slate-50">
            {/* Sidebar */}
            <aside className="hidden lg:flex col-span-3 min-h-screen bg-white border-r shadow-sm">
                <LeftSidebar />
            </aside>

            {/* Main Content */}
            <main className="col-span-12 lg:col-span-6 p-6 bg-gray-50">
                {children}
            </main>

            {/* Right */}
            <aside className="hidden lg:flex col-span-3 ">
                <RightSideBar />
            </aside>

        </div>
    );
}
