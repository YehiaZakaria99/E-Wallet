"use client";

import { useMemo } from "react";
import countriesData from "world-countries";
import { CircleFlag } from "react-circle-flags";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type CountryOption = { code: string; name: string };

const COUNTRY_OPTIONS: CountryOption[] = countriesData
    .map((c) => ({ code: c.cca2.toLowerCase(), name: c.name.common }))
    .sort((a, b) => a.name.localeCompare(b.name));

export function CountrySelect({
    value,
    onChange,
    placeholder = "Select country",
    showFlagsInList = true, 
}: {
    value?: string;
    onChange: (val: string) => void;
    placeholder?: string;
    showFlagsInList?: boolean;
}) {
    const selected = useMemo(
        () => COUNTRY_OPTIONS.find((c) => c.code === value),
        [value]
    );

    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                    <SelectValue placeholder={placeholder} />
                </div>
            </SelectTrigger>

            <SelectContent className="max-h-72">
                {COUNTRY_OPTIONS.map((opt) => (
                    <SelectItem key={opt.code} value={opt.code}>
                        <div className="flex items-center gap-2">
                            {showFlagsInList && (
                                <CircleFlag countryCode={opt.code} width={15} height={15} />
                            )}
                            <span>{opt.name}</span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
