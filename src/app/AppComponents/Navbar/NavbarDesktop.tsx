"use client"

import { linksType } from '@/interfaces/links.type'
import { cn } from '@/lib/utils';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'


type NavbarDesktopProps = {
    link: linksType
}

export default function NavbarDesktop({ link }: NavbarDesktopProps) {
    const pathname = usePathname();
    return (
        <>
            <li>
                <Link href={link.href} className={cn
                    (
                        `block py-2 px-3 text-stone-900 rounded-sm hover:bg-gray-100`,
                        `md:hover:bg-transparent md:border-0 md:hover:text-blue-900 md:p-0`,
                        `transition-all duration-300`,
                        pathname === link.href && `active`
                    )}>{link.name}</Link>
            </li>

        </>
    )
}
