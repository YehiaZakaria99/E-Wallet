import VerifyPhone from '@/app/_AppComponents/Dashboard/Verification/VerifyPhone/VerifyPhone'
import { loggedUser } from '@/app/_AppComponents/Guard/loggedUser';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function VerifyPhonePage() {

    const isLoggedUser = await loggedUser();
    if (!isLoggedUser) {
        redirect("/");
    }

    return (
        <>
            <section className='verify-phone max-w-md mx-auto py-48'>
                <VerifyPhone />
            </section>
        </>
    )
}
