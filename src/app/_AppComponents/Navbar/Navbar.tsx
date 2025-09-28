
import Link from 'next/link'
import React from 'react'
import NavbarDesktop from './NavbarDesktop'
import { linksType } from '@/interfaces/links.type'
import { useAppSelector } from '@/lib/redux/hooks'
import Logout from '../Auth/Logout'
import Cookies from "js-cookie";

const links: linksType[] = [
    {
        href: "/",
        name: "Home"
    },
    {
        href: "/accounts",
        name: "Accounts"
    },
    {
        href: "/transactions",
        name: "Transactions"
    },
    {
        href: "/verification",
        name: "Verification"
    },
]
const auth: linksType[] = [
    {
        href: "/login",
        name: "Login"
    },
    {
        href: "/signup",
        name: "Sign Up"
    },
]


export default function Navbar() {

    const { token } = useAppSelector((state) => state.signInReducer);
    return (
        <>
            <nav className=" border-gray-200 bg-blue-950  py-3 fixed z-[9999] top-0 left-0 w-full ">
                <div className="max-w-screen-xl flex flex-wrap items-center  mx-auto p-4">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse flex-1">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">E-Wallet</span>
                    </Link>
                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className="hidden w-full md:flex justify-between md:w-auto mx-auto flex-2 " id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 md:flex-row  md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:border-gray-700">
                            {
                                links.map((link) => (
                                    <NavbarDesktop key={link.href} link={link} />
                                ))
                            }
                        </ul>
                        {/* Auth */}
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 md:flex-row  md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:border-gray-700">

                            {
                                (token || Cookies.get("userToken"))
                                    ?
                                    <Logout />
                                    :
                                    auth.map((link) => (
                                        <NavbarDesktop key={link.href} link={link} />
                                    ))

                            }
                        </ul>
                    </div>

                </div>
            </nav>
        </>
    )
}
