"use client"

import { CardHeader } from '@/components/ui/card'
import React from 'react'
import { Stepper } from './Stepper'


type SignUpHeaderPropsType = {
    step: number;
}
export default function SignUpHeader({ step}: SignUpHeaderPropsType) {


    return (
        <>
            <CardHeader>
                <div className="space-y-6">
                    {/* Progress Steps */}
                    <Stepper step={step} steps={3} />

                    {/* {step === 1 && <div>Step 1 Form</div>}
                    {step === 2 && <div>Step 2 Form</div>}
                    {step === 3 && <div>Step 3 Form</div>} */}

                    {/* <div className="flex justify-end space-x-4">
                        {step > 1 && (
                            <button
                                onClick={() => dispatch(setStep(step - 1))}
                                className="px-4 py-2 rounded border"
                            >
                                Back
                            </button>
                        )}
                        {step < 3 && (
                            <button
                                onClick={() => dispatch(setStep(step + 1))}
                                className="px-4 py-2 rounded bg-pink-500 text-white"
                            >
                                Next
                            </button>
                        )}
                    </div> */}
                </div>

            </CardHeader>
        </>
    )
}
