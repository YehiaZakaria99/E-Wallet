import VerifyIdCard from '@/app/_AppComponents/Dashboard/Verification/VerifyIdCard'
import { loggedUser } from '@/app/_AppComponents/Guard/loggedUser';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function VerifyIdPage() {

    const isLoggedUser = await loggedUser();
    if (!isLoggedUser) {
        redirect("/");
    }

    return (
        <>
            <section className='max-w-2xl mx-auto py-48'>
                <VerifyIdCard />
            </section>
        </>
    )
}
