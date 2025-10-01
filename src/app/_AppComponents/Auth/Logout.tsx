"use client";

import { useAppDispatch } from '@/lib/redux/hooks'
import { logout } from '@/lib/redux/slices/auth/signinSlice'
import { cn } from '@/lib/utils'
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
        <li>
            <button
                onClick={handleLogout}
                className={cn(
                    "block py-2 px-3 text-gray-200 hover:underline hover:underline-offset-4 hover:text-white font-bold",
                    "md:hover:bg-transparent md:border-0 md:p-0",
                    "transition-all duration-300 cursor-pointer"
                )}
            >
                Logout
            </button>
        </li>
    );
}

export default memo(Logout);