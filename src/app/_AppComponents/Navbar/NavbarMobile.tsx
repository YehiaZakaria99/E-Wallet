import { linksType } from '@/interfaces/links.type'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'


type NavbarMobileProps = {
    link: linksType;
    pathname: string;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NavbarMobile({ link, pathname, setIsMenuOpen }: NavbarMobileProps) {

    return (
        <>
            <li>
                <Link
                    onClick={() => setIsMenuOpen(false)}
                    href={link.href}
                    className={cn
                        (
                            `block py-2 px-3 text-gray-200 hover:underline hover:underline-offset-4 hover:text-white font-bold`,
                            `md:hover:bg-transparent md:border-0  md:p-0`,
                            `transition-all duration-300 `,
                            pathname === link.href && `active`
                        )}>{link.name}</Link>
            </li>
        </>
    )
}
