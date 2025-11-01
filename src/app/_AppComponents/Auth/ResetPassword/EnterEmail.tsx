import { CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import React from 'react'
import ShowError from '../ShowError'
import { Button } from '@/components/ui/button'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { enterEmailType } from '@/interfaces/auth/resetPassword.types'
import Link from 'next/link'
import { useForgetPassword } from '@/hooks/useForgetPassword'

type EnterEmailPropsType = {
    enterEmailForm: UseFormReturn<enterEmailType>;
}


export default function EnterEmail({ enterEmailForm }: EnterEmailPropsType) {
    const { register, handleSubmit, formState: { errors }, reset } = enterEmailForm;


    const { sendEmailMutation, timer } = useForgetPassword()


    const onSubmit: SubmitHandler<enterEmailType> = ({ email }) => {
        sendEmailMutation.mutate({ email });
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label className="text-blue-950" htmlFor="email">Enter Your Email</Label>
                        <Input
                            {...register("email")}
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                        />
                        {sendEmailMutation.isSuccess && (
                            <div className='flex py-3 items-center gap-2'>
                                <p className='text-sm'>
                                    {/* {sendEmailMutation.data?.message } */}
                                </p>
                                {timer > 0 && (
                                    <span className="text-sm text-gray-600">
                                        Resend again after {timer}s
                                    </span>
                                )}
                            </div>
                        )}
                        {sendEmailMutation.isError && (
                            <div className='flex py-3 items-center gap-2'>
                                <p className='text-sm text-center text-red-500 font-semibold'>
                                    Make Sure You Entered A valid Email Or
                                    <Link className='inline-block text-blue-950 underline ' href={"/email-verify"}>Verify Your Email</Link>
                                    {/* {sendEmailMutation.data?.message} */}
                                </p>
                            </div>
                        )}
                        <ShowError error={errors.email} />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 pt-4">
                <Button
                    type="submit"
                    disabled={sendEmailMutation.isPending || timer > 0}
                    className="w-full cursor-pointer bg-blue-950 transition-all duration-300 hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {sendEmailMutation.isPending ? "Sending..." : "Reset"}
                </Button>
            </CardFooter>
        </form>
    );
}
