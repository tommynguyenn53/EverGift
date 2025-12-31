'use client'

import { useState } from 'react'

type Option = {
    label: string
    value: string
}

type DropdownProps = {
    value: string | null
    onChange: (value: string) => void
    options: Option[]
    placeholder: string
}

export default function Dropdown({
                                     value,
                                     onChange,
                                     options,
                                     placeholder,
                                 }: DropdownProps) {
    const [open, setOpen] = useState(false)

    const selectedLabel =
        options.find((o) => o.value === value)?.label ?? placeholder

    return (
        <div className="w-[298px]">
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`w-full appearance-none px-[15px] py-[8px] bg-white border border-[#E7DCC8] rounded-[16px] 
                flex items-center justify-between shadow-[6px_4px_18px_rgba(0,0,0,0.1)] transition ${open ? 'shadow-none' : ''}
                focus:ring-2 focus:ring-[#E7DCC8]/50  
        `}
            >
        <span
            className="font-inter font-normal text-[12px] leading-[170%] tracking-[0.015em] text-[#3A3A3A] h-[33px]
             flex items-center"
        >
          {selectedLabel}
        </span>

                <img
                    src="/open-icon.svg"
                    alt=""
                    className={`transition-transform ${open ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Options */}
            {open && (
                <div
                    className="mt-[16px] bg-white border border-[#E7DCC8] rounded-[16px] overflow-hidden
                    shadow-[6px_4px_18px_rgba(0,0,0,0.1)]"
                >
                    {options.map((option, index) => {
                        const isLast = index === options.length - 1

                        return (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                    onChange(option.value)
                                    setOpen(false)
                                }}
                                className={`w-full px-[15px] py-[12px] text-left font-inter font-normal text-[12px] 
                                leading-[170%] tracking-[0.015em] text-[#3A3A3A] border-t border-[#E7DCC8] hover:bg-black/5 
                                transition
                  ${index === 0 ? 'border-t-0' : ''}
                  ${isLast ? 'rounded-b-[16px]' : ''} appearance-none
                `}
                            >
                                {option.label}
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
