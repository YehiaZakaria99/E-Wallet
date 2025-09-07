"use client";

import React, { useEffect, useMemo, useState } from "react";
import countriesData from "world-countries";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ControllerRenderProps } from "react-hook-form";
import ReactCountryFlag from "react-country-flag";
import { signUpInputs } from "@/interfaces/auth/signupInputs.types";

type CountryOption = { code: string; name: string };

const COUNTRY_OPTIONS: CountryOption[] = countriesData
    .map((c) => ({ code: c.cca2.toLowerCase(), name: c.name.common }))
    .sort((a, b) => a.name.localeCompare(b.name));

type CountrySelectProps = {
    placeholder?: string;
    showFlagsInList?: boolean;
    defaultCountry?: string;
    field: ControllerRenderProps<signUpInputs, "country">;
};

export const CountrySelect = React.memo(function CountrySelect({
    placeholder = "Select country",
    showFlagsInList = true,
    defaultCountry,
    field,
}: CountrySelectProps) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!field.value && defaultCountry) {
            field.onChange(defaultCountry);
        }
    }, []);

    const selectedCountry = useMemo(
        () => COUNTRY_OPTIONS.find((c) => c.code === field.value),
        [field.value]
    );

    const countryItems = useMemo(
        () =>
            COUNTRY_OPTIONS.map((opt) => (
                <SelectItem key={opt.code} value={opt.code} textValue={opt.name}>
                    <div className="flex items-center gap-2">
                        {showFlagsInList && (
                            <ReactCountryFlag
                                countryCode={opt.code.toUpperCase()}
                                svg
                                style={{ width: "1rem", height: "1rem", lineHeight: 0 }}
                                aria-hidden
                            />
                        )}
                        <span>{opt.name}</span>
                    </div>
                </SelectItem>
            )),
        [showFlagsInList]
    );

    return (
        <Select
            value={field.value}
            onValueChange={field.onChange}
            onOpenChange={setOpen}
        >
            <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                    {selectedCountry ? (
                        <>
                            {showFlagsInList && (
                                <ReactCountryFlag
                                    countryCode={selectedCountry.code.toUpperCase()}
                                    svg
                                    style={{ width: "1rem", height: "1rem", lineHeight: 0 }}
                                    aria-hidden
                                />
                            )}
                            <span className="truncate">{selectedCountry.name}</span>
                        </>
                    ) : (
                        <SelectValue placeholder={placeholder} />
                    )}
                </div>
            </SelectTrigger>

            <SelectContent className="max-h-72 p-0">
                {open ? (
                    <div className="py-1">{countryItems}</div>
                ) : null}
            </SelectContent>
        </Select>
    );
});
