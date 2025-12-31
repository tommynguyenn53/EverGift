'use client'

import { useState } from 'react'

type Props = {
    value: boolean
    onChange: (value: boolean) => void
}

export default function FeeCoverageToggle({ value, onChange }: Props) {
    return (
        <button
            onClick={() => onChange(!value)}
            className={`relative w-[44px] md:w-[66px] h-[24px] md:h-[36px] rounded-full transition-colors
        ${value ? 'bg-[#D8C9A6]' : 'bg-[#E5E5E5]'}
      `}
        >
      <span
          className={`absolute top-[2px] md:top-[3px] left-[2px] md:left-[3px] w-[20px] md:w-[30px] h-[20px] 
          md:h-[30px] rounded-full bg-white transition-transform
             ${value? 'translate-x-[20px] md:translate-x-[30px]': 'translate-x-0'}
        `}
      />
        </button>
    )
}

