import { useAppDispatch } from '@/lib/redux/hooks'
import { logout } from '@/lib/redux/slices/auth/signinSlice'
import { cn } from '@/lib/utils'
import React from 'react'

export default function Logout() {
    const dispatch = useAppDispatch()
    return (
        <>
            <li>
                <button
                    onClick={() => dispatch(logout())}
                    className={cn(
                        `block py-2 px-3 text-gray-200 hover:underline hover:underline-offset-4 hover:text-white font-bold`,
                        `md:hover:bg-transparent md:border-0  md:p-0`,
                        `transition-all duration-300 `,
                        `cursor-pointer`
                    )}
                >
                    Logout
                </button>
            </li>
        </>
    )
}
