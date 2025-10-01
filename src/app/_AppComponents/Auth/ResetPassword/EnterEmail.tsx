import { CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import React from 'react'
import ShowError from '../ShowError'
import { Button } from '@/components/ui/button'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { enterEmailType } from '@/interfaces/auth/resetPassword.types'
import { baseUrl } from '@/server/config'
import { useMutation } from '@tanstack/react-query'
import { showToast } from 'nextjs-toast-notify'


type EnterEmailPropsType = {
    enterEmailForm: UseFormReturn<enterEmailType>;

}

type succesFinalRespType = {
    message?: string;
}


async function sendEmail(body: { email: string }) {
    const res = await fetch(`${baseUrl}/auth/forget-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    let finalResp;

    try {
        finalResp = await res.json();
    } catch {
        throw new Error("Verification failed");
    }

    if (!res.ok) {
        throw new Error(
            Array.isArray(finalResp.message)
                ? finalResp.message.join(", ")
                : finalResp.message || "Something went wrong"
        );
    }

    return finalResp as succesFinalRespType;
}

export default function EnterEmail({ enterEmailForm }: EnterEmailPropsType) {
    const { register, handleSubmit, formState: { errors }, reset } = enterEmailForm;

    const sendEmailMutation = useMutation({
        mutationFn: sendEmail,
        retry: false,
        onSuccess: (data) => {
            showToast.success(data.message || "Email Verification Successfully ✅", {
                duration: 3000,
                position: "top-center",
            });
            reset();
        },
        onError: (error: unknown) => {
            const message = error instanceof Error ? error.message : "Verification failed";
            showToast.error(message, { duration: 5000, position: "top-center" });
        },
    });

    const onSubmit: SubmitHandler<enterEmailType> = ({ email }) => {
        sendEmailMutation.mutate({ email });
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
                        <ShowError error={errors.email} />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 pt-4">
                <Button
                    type="submit"
                    disabled={sendEmailMutation.isPending}
                    className="w-full cursor-pointer bg-blue-950 transition-all duration-300 hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {sendEmailMutation.isPending ? "Sending..." : "Reset"}
                </Button>
            </CardFooter>
        </form>
    );
}

