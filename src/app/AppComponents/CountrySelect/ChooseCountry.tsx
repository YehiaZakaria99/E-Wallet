"use client"

import React, { useState } from 'react'
import { CountrySelect } from './CountrySelect'

export default function ChooseCountry() {
    const [country, setCountry] = useState<string>("eg");

    return (
        <>
            <CountrySelect
                value={country}
                onChange={setCountry}
                placeholder="Select country"
                showFlagsInList={true}
            />
        </>
    )
}
