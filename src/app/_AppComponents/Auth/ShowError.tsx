import React from 'react'
import { FieldError } from 'react-hook-form'

export default function ShowError({ error }: { error: FieldError | undefined }) {
    return (
        <>
            {error && <p className='text-red-500'>{error.message}</p>}
        </>
    )
}
