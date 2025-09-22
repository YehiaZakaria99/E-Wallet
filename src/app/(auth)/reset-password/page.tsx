import ResetPasswordForm from '@/app/_AppComponents/Auth/ResetPasswordForm'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

export default function ResetPassword() {
  return (
    <>
      <section className="py-36 px-5">
        <Card className="w-full max-w-sm mx-auto shadow-lg shadow-stone-700 pb-1 ">
          <CardHeader>
            <CardTitle className="text-stone-900 text-center">
              Reset Password
            </CardTitle>
          </CardHeader>
          <ResetPasswordForm />
        </Card>
      </section>
    </>
  )
}
