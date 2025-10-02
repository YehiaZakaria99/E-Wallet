"use client";

import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/lib/redux/hooks'
import { logout } from '@/lib/redux/slices/auth/signinSlice'
import { cn } from '@/lib/utils'
import { LogoutOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation'
import React, { memo } from 'react'


type LogoutPropsType = {
    setIsMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

function Logout({ setIsMenuOpen }: LogoutPropsType) {
    const dispatch = useAppDispatch();
    const router = useRouter();

    function handleLogout() {
        dispatch(logout());
        router.replace("/login");
        if (setIsMenuOpen) {
            setIsMenuOpen(false)
        }
    }

    return (
        <Button
            variant="ghost"
            onClick={handleLogout}
            className={cn(
                // "block py-2 px-3 text-gray-200 hover:underline hover:underline-offset-4 hover:text-white font-bold",
                // "md:hover:bg-transparent md:border-0 md:p-0",
                "transition-all duration-300 cursor-pointer",
                "w-full justify-start gap-3 text-red-600 hover:bg-red-50 hover:text-red-700"
            )}
        >
            <LogoutOutlined />
            Logout
        </Button>
    );
}

export default memo(Logout);