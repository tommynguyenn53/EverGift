'use client'

import { QRCodeCanvas } from 'qrcode.react'

type Props = {
    value: string
}

export default function WeddingQrCode({ value }: Props) {
    return (
        <div className="bg-white rounded-xl p-6 shadow flex justify-center">
            <QRCodeCanvas
                value={value}
                size={220}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
                includeMargin
            />
        </div>
    )
}
