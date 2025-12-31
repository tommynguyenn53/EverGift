'use client'

import { useEffect, useRef, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

type Props = {
    value: string
}


function useIsDesktop() {
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        const media = window.matchMedia('(min-width: 768px)')
        setIsDesktop(media.matches)

        const handler = () => setIsDesktop(media.matches)
        media.addEventListener('change', handler)

        return () => media.removeEventListener('change', handler)
    }, [])

    return isDesktop
}

export default function WeddingQrCodeDashboard({ value }: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const linkRef = useRef<HTMLAnchorElement | null>(null)

    useEffect(() => {
        if (!canvasRef.current || !linkRef.current) return

        const dataUrl = canvasRef.current.toDataURL('image/png')
        linkRef.current.href = dataUrl
    }, [value])

    const isDesktop = useIsDesktop()

    return (
        <a
            ref={linkRef}
            download="evergift-qr-code.png"
            className="w-[130px] md:w-[195px] h-[130px] md:h-[195px] bg-white rounded-[10px] md:rounded-[15px]
             shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex flex-col items-center py-[10px] md:py-[15px]   select-none
            "
        >
            <p
                className="font-inter font-medium text-[12px] md:text-[18px] tracking-[0.015em] text-[#3A3A3A]"
            >
                QR Code
            </p>

            <div className="mt-[6px] md:mt-[9px]" />


            <QRCodeCanvas
                ref={canvasRef}
                value={value}
                size={isDesktop ? 125: 85}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
                includeMargin={false}
            />
        </a>
    )
}
