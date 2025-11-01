"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import {
  HomeOutlined,
  WalletOutlined,
  SyncOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logout from "../../Auth/Logout";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { decodedTokenType } from "@/interfaces/token/decodedToken.types";

function SidebarComponent() {
  const pathname = usePathname();
  let decoded: decodedTokenType;
  const refreshToken = Cookies.get("userToken") || "";

  // if (refreshToken) {
  //   decoded = jwtDecode(refreshToken);
  // }

  // const [userName, setUserName] = useState("");
  // useEffect(() => {
  //   setUserName(decoded.email.replace(/@(?<=[@]).*/, ""));
  // }, [userName, refreshToken]);


  const navItems = [
    { name: "Dashboard", icon: <HomeOutlined />, href: "/dashboard" },
    { name: "Profile", icon: <UserOutlined />, href: "/dashboard/profile" },
    { name: "My Wallet", icon: <WalletOutlined />, href: "/dashboard/wallet" },
    { name: "Transactions", icon: <SyncOutlined />, href: "/dashboard/transactions" },
    { name: "Settings", icon: <SettingOutlined />, href: "/dashboard/settings" },
  ];

  return (
    <div className="flex flex-col justify-between w-full py-14">

      {/* User Info */}
      <div className="px-6 mb-8">
        <div className="text-xs text-muted-foreground">Welcome</div>
        <div className="font-semibold text-lg text-blue-950">{"userName"}</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4">
        {navItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 text-stone-950 hover:text-primary hover:bg-accent transition-colors cursor-pointer",
                pathname === item.href && `active-sidebar`
              )}
            >
              {item.icon}
              <span>{item.name}</span>
            </Button>
          </Link>
        ))}

        <Logout />

      </nav>
    </div>
  );
}

const LeftSidebar = React.memo(SidebarComponent);
export default LeftSidebar;
