import ResetPasswordForm from '@/app/_AppComponents/Auth/ResetPassword/ResetPasswordForm'
import { Card } from '@/components/ui/card'
import React from 'react'

export default function ResetPassword() {
  return (
    <>
      <section className="py-48 px-5">
        <Card className="w-full max-w-sm mx-auto shadow-lg shadow-stone-700 pb-1 ">
          <ResetPasswordForm />
        </Card>
      </section>
    </>
  )
}
