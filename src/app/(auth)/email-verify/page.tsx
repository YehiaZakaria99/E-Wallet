import VerifyEmailForm from '@/app/_AppComponents/Auth/VerifyEmailForm'
import { loggedUser } from '@/app/_AppComponents/Guard/loggedUser'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {

    const isLoggedUser = await loggedUser();
    if (isLoggedUser) {
        redirect("/dashboard");
    }

    return (
        <>
            <section className="py-48 px-5">
                <Card className="w-full max-w-sm mx-auto shadow-lg shadow-stone-700 pb-1 ">
                    <CardHeader>
                        <CardTitle className="text-blue-950 text-center">
                            Verify Email
                        </CardTitle>
                    </CardHeader>
                    <VerifyEmailForm />
                </Card>
            </section>
            {/* <Button
                    // onClick={handleVerify}
                    className="bg-blue-950 hover:bg-blue-900 cursor-pointer">
                    Verify Email
                </Button> */}
        </>
    )
}


/* 

<Card className="w-full max-w-sm mx-auto shadow-lg shadow-stone-700 pb-1 ">
          <CardHeader>
            <CardTitle className="text-stone-900 text-center">
              Verify Email
            </CardTitle>
          </CardHeader>
          <VerifyEmailForm />
</Card>

*/