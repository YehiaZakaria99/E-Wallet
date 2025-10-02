"use client";

import React from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import {
  HomeOutlined,
  WalletOutlined,
  SyncOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logout from "../../Auth/Logout";
import { usePathname } from "next/navigation";

function SidebarComponent() {
  const pathname = usePathname();
  // const { fullname } = useAppSelector((state) => state.signUpReducer);

  const navItems = [
    { name: "Dashboard", icon: <HomeOutlined />, href: "/dashboard" },
    { name: "My Wallet", icon: <WalletOutlined />, href: "/dashboard/wallet" },
    { name: "Transactions", icon: <SyncOutlined />, href: "/dashboard/transactions" },
    { name: "Settings", icon: <SettingOutlined />, href: "/dashboard/settings" },
    // { name: "Logout", icon: <Logout />, href: "/dashboard/settings" },

  ];

  return (
    // <aside className="hidden lg:flex col-span-3 min-h-screen bg-white border-r shadow-sm">
      <div className="flex flex-col justify-between w-full py-14">
        
        {/* User Info */}
        <div className="px-6 mb-8">
          <div className="text-xs text-muted-foreground">Welcome</div>
          <div className="font-semibold text-lg text-blue-950">{"Eslam"}</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-4">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 text-stone-950 hover:text-primary hover:bg-accent transition-colors",
                  pathname === item.href && `active-sidebar`
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </Button>
            </Link>
          ))}

        </nav>

        {/* Logout */}
        <div className="px-4 mt-6">
          <Logout />
          
          {/* <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={() => {
              // TODO: Add logout logic
              console.log("Logout clicked");
            }}
          >
            
          </Button> */}
        </div>
      </div>
    // </aside>
  );
}

const LeftSidebar = React.memo(SidebarComponent);
export default LeftSidebar;
