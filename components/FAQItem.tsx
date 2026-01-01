'use client'

import { useState } from 'react'

export function FAQItem({
                            index,
                            question,
                            answer,
                        }: {
    index: number
    question: string
    answer: string
}) {
    const [open, setOpen] = useState(false)

    return (
        <div
            className="bg-white border border-[#E7DCC8] rounded-[16px] gap-[10px] px-[13px] py-[8px] md:px-[17px] md:py-[12px]
             w-[327px] md:w-[490px]"
        >
            {/* Header row */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-start justify-between text-left"
            >
                <p
                    className="font-inter font-normal text-[12px] md:text-[18px] leading-[170%] tracking-[0.015em]
                    text-[#3A3A3A] w-[302px] md:w-[453px]"
                >
                    {index}. {question}
                </p>

                {/* Chevron */}
                <img
                    src="/open-icon.svg"
                    alt=""
                    className={`w-[20px] h-[20px] md:w-[36px] md:h-[36px] transition-transform duration-300
            ${open ? 'rotate-180' : 'rotate-0'}
          `}
                />
            </button>

            {/* Animated open state */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out
          ${open ? 'max-h-[300px] opacity-100 mt-[8px] md:mt-[12px]' : 'max-h-0 opacity-0'}
        `}
            >
                <div className="flex flex-col gap-[8px] md:gap-[12px]">
                    {/* Divider */}
                    <div className="w-full h-[1px] bg-[#E7DCC8]" />

                    {/* Answer */}
                    <p
                        className="font-inter font-normal text-[12px] md:text-[18px] leading-[150%] tracking-[0.015em]
                         text-[#3A3A3A] w-[295px] md:w-[453px] text-left"
                    >
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    )
}
