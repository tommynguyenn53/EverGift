'use client'

import { QRCodeCanvas } from 'qrcode.react'

type Props = {
    value: string
}

export default function WeddingQrCode({ value }: Props) {
    return (
        <div
            className="
        w-[244px]
        h-[244px]
        bg-white
        rounded-[10px]
        shadow-[0px_4px_12px_rgba(0,0,0,0.05)]
        flex
        flex-col
        items-center
        py-[10px]
      "
        >
            {/* Heading */}
            <p
                className="
          font-inter
          font-medium
          text-[16px]
          tracking-[0.015em]
          text-[#3A3A3A]
        "
            >
                QR Code
            </p>

            {/* Spacer */}
            <div className="mt-[16px]" />

            {/* QR */}
            <QRCodeCanvas
                value={value}
                size={170}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
                includeMargin={false}
            />
        </div>
    )
}
