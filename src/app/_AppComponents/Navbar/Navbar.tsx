"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import NavbarDesktop from './NavbarDesktop'
import { linksType } from '@/interfaces/links.type'
import { useAppSelector } from '@/lib/redux/hooks'
import Logout from '../Auth/Logout'
import Cookies from "js-cookie";
import { CloseOutlined, MenuOutlined } from '@ant-design/icons'
import NavbarMobile from './NavbarMobile'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

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
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const pathname = usePathname();

    const { token } = useAppSelector((state) => state.signInReducer);

    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    const loggedIn = isClient && (token || Cookies.get("userToken"));


    return (
        <>
            <nav className=" border-gray-200 bg-blue-950  py-3 fixed z-[9999] top-0 left-0 w-full ">
                <div className="max-w-screen-xl flex flex-wrap items-center  mx-auto p-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse flex-1">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">E-Wallet</span>
                    </Link>

                    {/* Desktop */}
                    <div className="hidden w-full md:flex justify-between md:w-auto mx-auto flex-2 " id="navbar-default">
                        {/* Desktop Links */}
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 md:flex-row  md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:border-gray-700">
                            {
                                links.map((link) => (
                                    <NavbarDesktop pathname={pathname} key={link.href} link={link} />
                                ))
                            }
                        </ul>
                        {/* Auth */}
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 md:flex-row  md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:border-gray-700">
                            {loggedIn ? (
                                <Logout />
                            ) : (
                                auth.map((link) => <NavbarDesktop pathname={pathname} key={link.href} link={link} />)
                            )}
                        </ul>
                    </div>

                    {/* Mobile Button Menu */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="cursor-pointer inline-flex items-center p-2 w-10 h-10 justify-center text-xl text-blue-950 rounded-lg md:hidden bg-white "
                        type="button"
                        aria-controls="navbar-default"
                    >
                        <span className="sr-only">Open main menu</span>

                        {
                            !isMenuOpen && <MenuOutlined />
                        }
                        {
                            isMenuOpen && <CloseOutlined />
                        }
                    </button>
                </div>
                {/* Mobile Links */}
                <div className={cn(
                    "md:hidden w-full flex flex-col justify-between md:w-auto mx-auto flex-2",
                    isMenuOpen
                        ? "max-h-[1000px] opacity-100 py-4 pointer-events-auto"
                        : "max-h-0 opacity-0 py-0 pointer-events-none",
                )}
                    id="navbar-default">

                    <ul className="font-medium flex flex-col px-4 py-3">
                        {
                            links.map((link) => (
                                <NavbarMobile key={`${link.href}-Mobile`} setIsMenuOpen={setIsMenuOpen} pathname={pathname} link={link} />
                            ))
                        }
                    </ul>
                    {/* Auth */}
                    <ul className="font-medium flex flex-col px-4 py-3 border-t border-gray-100 ">
                        {
                            auth.map((link) => (
                                <NavbarMobile key={`${link.href}-Mobile`} setIsMenuOpen={setIsMenuOpen} pathname={pathname} link={link} />
                            ))
                        }
                    </ul>

                </div>
            </nav>
        </>
    )
}
