'use client'

import {useRef, useState} from 'react'

const PRESET_AMOUNTS = [50, 100, 150, 200]

type Props = {
    amountCents: number
    onChange: (value: number) => void
}


export default function GiftAmountSelector({amountCents, onChange}: Props) {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
    const [customAmount, setCustomAmount] = useState('')
    const inputRef = useRef<HTMLInputElement | null>(null)

    const isCustom = selectedAmount === -1

    const selectPreset = (amount: number) => {
        setSelectedAmount(amount)
        setCustomAmount('')
        onChange(amount * 100)
    }

    const selectCustom = () => {
        setSelectedAmount(-1)
        requestAnimationFrame(() => inputRef.current?.focus())
    }

    const handleCustomChange = (raw: string) => {
        // Digits only
        let value = raw.replace(/\D/g, '')

        // Strip leading zeros
        value = value.replace(/^0+/, '')

        setCustomAmount(value)

        const num = Number(value)

        if (num >= 1) {
            onChange(num * 100) // cents
        }
    }


    return (
        <div className="mt-[40px] md:mt-[60px] flex flex-col items-center">
            <h2 className="font-inter font-medium text-[20px] md:text-[30px] tracking-[0.015em] text-[#3A3A3A]">
                Select your gift amount
            </h2>

            {/* Presets */}
            <div
                className="mt-[24px] md:mt-[36px] grid grid-cols-2 gap-x-[20px] md:gap-x-[30px] gap-y-[12px] md:gap-y-[18px]">
                {PRESET_AMOUNTS.map((amount) => {
                    const active = selectedAmount === amount

                    return (
                        <button
                            key={amount}
                            onClick={() => selectPreset(amount)}
                            className={`w-[134px] md:w-[201px] h-[48px] md:h-[72px] rounded-[14px] md:rounded-[21px]
                            font-inter text-[16px] md:text-[24px] text-[#3A3A3A] bg-[#F7F2E9] shadow-[6px_4px_18px_rgba(0,0,0,0.10)]
                            transition
                ${active
                                ? 'scale-[0.97] shadow-inner bg-[#EFE6D7]'
                                : 'hover:opacity-90'}
              `}
                        >
                            ${amount}
                        </button>
                    )
                })}
            </div>

            {/* Other amount */}
            <button
                onClick={selectCustom}
                className={`mt-[12px] md:mt-[18px] w-[288px] md:w-[432px] h-[48px] md:h-[72px] rounded-[14px] md:rounded-[21px] 
                font-inter text-[16px] md:text-[24px] text-[#3A3A3A] bg-[#F7F2E9] shadow-[6px_4px_18px_rgba(0,0,0,0.10)]
                transition
          ${isCustom
                    ? 'scale-[0.97] shadow-inner bg-[#EFE6D7]'
                    : 'hover:opacity-90'}
        `}
            >
                Other Amount
            </button>

            {/* Custom input */}
            <input
                ref={inputRef}
                type="number"
                inputMode="decimal"
                min={1}
                step={1}
                disabled={!isCustom}
                placeholder="$1"
                value={customAmount}
                onChange={(e) => handleCustomChange(e.target.value)}
                onKeyDown={(e) => {
                    if (['-', '+', '/', '*', 'e', 'E', '.'].includes(e.key)) {
                        e.preventDefault()
                    }
                }}
                className={`mt-[16px] md:mt-[24px] w-[298px] md:w-[447px] rounded-[10px] md:rounded-[15px] px-[15px]
                md:px-[22.5px] py-[15px] md:py-[22.5px] font-inter text-[15px] md:text-[22.5px] border border-black/10 
                bg-white transition
          ${isCustom
                    ? 'opacity-100'
                    : 'opacity-40 cursor-not-allowed'}
          focus:outline-none focus:ring-2 focus:ring-[#D8C9A6]/50
        `}
            />
        </div>
    )
}
