'use client'

import { useEffect, useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

type Props = {
    value: string
}

export default function WeddingQrCodeDashboard({ value }: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const linkRef = useRef<HTMLAnchorElement | null>(null)

    useEffect(() => {
        if (!canvasRef.current || !linkRef.current) return

        const dataUrl = canvasRef.current.toDataURL('image/png')
        linkRef.current.href = dataUrl
    }, [value])

    return (
        <a
            ref={linkRef}
            download="evergift-qr-code.png"
            className="
                w-[130px]
                h-[130px]
                bg-white
                rounded-[10px]
                shadow-[0px_4px_12px_rgba(0,0,0,0.05)]
                flex
                flex-col
                items-center
                py-[10px]
                select-none
            "
        >
            <p
                className="
                    font-inter
                    font-medium
                    text-[12px]
                    tracking-[0.015em]
                    text-[#3A3A3A]
                "
            >
                QR Code
            </p>

            <div className="mt-[6px]" />

            <QRCodeCanvas
                ref={canvasRef}
                value={value}
                size={85}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
                includeMargin={false}
            />
        </a>
    )
}
