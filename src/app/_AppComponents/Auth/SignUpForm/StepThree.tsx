import { CardAction, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import React, { useEffect } from 'react'
import ShowError from '../ShowError'
import { Control, Controller, FieldErrors, FieldValues, SubmitHandler, UseFormRegister, UseFormReturn } from 'react-hook-form'
import { CountrySelect } from '../../CountrySelect/CountrySelect'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { codeInput, idCardInput, signUpInputs } from '@/interfaces/auth/signupInputs.types'
import { AppDispatch } from '@/lib/redux/store'
import { resetSignUp, setCode, setIdCard, setStep, setUserInfo } from '@/lib/redux/slices/auth/signupSlice'
import { useRouter } from 'next/navigation'
import FileUpload from './FileUpload'
import { useAppSelector } from '@/lib/redux/hooks'


type StepThreePropsType = {
    formStepThree: UseFormReturn<idCardInput, idCardInput>;
    dispatch: AppDispatch;
}
export default function StepThree({ formStepThree, dispatch }: StepThreePropsType) {

    const { idCard } = useAppSelector((state) => state.signUpReducer);

    const router = useRouter()

    const { register, formState: { errors }, handleSubmit, reset } = formStepThree;

    const onSubmit: SubmitHandler<idCardInput> = (data) => {

        const files = data.idCard;
        if (files) {
            Array.from(files).map((file) => {
                console.log(file);
                dispatch(setIdCard(file));
            })
            router.push("/");
        }
        
        
    };
    
    useEffect(()=>{
        console.log("idCard from Slice : ", idCard);
    },[idCard])



    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                    <div className="flex flex-col gap-6">
                    </div>
                    <FileUpload register={register} errors={errors} />
                </CardContent>

                <CardFooter className="flex-col gap-2 py-4">
                    <Button
                        type="submit"
                        className="w-full cursor-pointer bg-stone-900 transition-all duration-300 hover:bg-stone-700"
                    >
                        Submit
                    </Button>
                </CardFooter>
            </form>

        </>
    )
}
