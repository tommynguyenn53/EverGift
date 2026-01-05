'use client'

import { useState } from 'react'
import GiftAmountSelector from '@/components/GiftAmountSelector'
import GiftSummaryCard from '@/components/GiftSummaryCard'
import FeeCoverageToggle from '@/components/FeeCoverageToggle'
import { calculateSummary } from '@/lib/payments/calculateSummary'
import { formatCents } from '@/lib/payments/format'
import PortraitUploadTile from "@/components/PortraitUploadTile";
import { supabaseBrowser } from '@/lib/supabase/client'


type Props = {
    weddingId: string
    slug: string
}

const MESSAGE_LIMIT = 200

const supabase = supabaseBrowser()



export default function GiftSelectionClient({ weddingId, slug }: Props) {
    const [amountCents, setAmountCents] = useState(0)
    const [guestCoversFees, setGuestCoversFees] = useState(false)
    const [guestName, setGuestName] = useState('')
    const [message, setMessage] = useState('')
    const [giftImage, setGiftImage] = useState<{
        path: string
        publicUrl: string
    } | null>(null)
    const [uploadingImage, setUploadingImage] = useState(false)




    const {
        platformFeeCents,
        stripeFeeCents,
        totalChargedCents,
    } = calculateSummary(amountCents, guestCoversFees)

    const totalFeesCents = guestCoversFees
        ? totalChargedCents - amountCents
        : platformFeeCents + stripeFeeCents

    const hasAmount = amountCents > 0


    const handleProceedToPayment = async () => {
        if (!amountCents || !guestName) return

        const res = await fetch(`/${slug}/gift/create-checkout-session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                weddingId,
                slug,
                amountCents,
                guestName,
                message,
                guestCoversFees,
                imagePath: giftImage?.path ?? null,
                imagePublicUrl: giftImage?.publicUrl ?? null,
            }),
        })

        if (!res.ok) {
            alert('Failed to start payment')
            return
        }

        const { url } = await res.json()
        window.location.href = url
    }

    async function uploadGiftImage(file: File) {
        setUploadingImage(true)

        try {
            // Basic validation
            if (!file.type.startsWith('image/')) {
                throw new Error('Only image files are allowed')
            }

            // Optional: size limit (recommended)
            const MAX_SIZE_MB = 5
            if (file.size > MAX_SIZE_MB * 1024 * 1024) {
                throw new Error('Image must be under 5MB')
            }

            const fileExt = file.name.split('.').pop()
            const fileName = `${Date.now()}-${Math.random()
                .toString(36)
                .slice(2)}.${fileExt}`

            /**
             * IMPORTANT:
             * We don’t have a gift ID yet (created after checkout),
             * so we scope uploads by wedding + temp folder
             */
            const filePath = `${weddingId}/temp/${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('gift-images')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false,
                })

            if (uploadError) {
                throw uploadError
            }

            const { data } = supabase.storage
                .from('gift-images')
                .getPublicUrl(filePath)

            setGiftImage({
                path: filePath,
                publicUrl: data.publicUrl,
            })
        } finally {
            setUploadingImage(false)
        }
    }


    return (
        <main className="w-full flex flex-col items-center">
            <GiftAmountSelector amountCents={amountCents} onChange={setAmountCents}/>

            {/* Name */}
            <div className="mt-[24px] md:mt-[36px] w-[298px] md:w-[447px]">
                <label
                    className="block mb-[6px] md:mb-[9px] font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">
                    Your name
                </label>
                <input
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value.trimStart())}
                    placeholder="Your name"
                    className="w-full rounded-[10px] md:rounded-[15px] bg-white px-[15px] md:px-[22.5px] py-[15px] md:py-[22.5px] border border-black/12 font-inter text-[15px] md:text-[22.5px]"
                />
            </div>

            {/* Message */}
            <div className="mt-[24px] md:mt-[36px] w-[298px] md:w-[447px]">
                <label
                    className="block mb-[6px] md:mb-[9px] font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">
                    Add a message
                </label>
                <textarea
                    value={message}
                    maxLength={MESSAGE_LIMIT}
                    onChange={(e) => setMessage(e.target.value.slice(0, MESSAGE_LIMIT))}
                    rows={3}
                    placeholder="Write your message here…"
                    className="w-full resize-none rounded-[10px] md:rounded-[15px] bg-white px-[15px] md:px-[22.5px] py-[15px] md:py-[22.5px] border border-black/12 font-inter text-[15px] md:text-[22.5px]"
                />
                <div className="mt-[6px] md:mt-[9px] flex justify-between text-[11px] md:text-[16.5px] text-[#3A3A3A]">
                    <span>This message will be shared with the couple.</span>
                    <span className="opacity-60">{message.length}/{MESSAGE_LIMIT}</span>
                </div>
            </div>

            <div className="mt-[24px] md:mt-[36px] w-[298px] md:w-[447px]">
                <label
                    className="block font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">
                    Add a photo (optional)
                </label>

                <p className="mt-[6px] md:mt-[9px] text-[11px] md:text-[16.5px] text-[#3A3A3A]/60">
                    This photo will be shared with the couple.
                </p>

                <div className="flex justify-center mt-[18px] md:mt-[27px]">
                    <PortraitUploadTile
                        uploadedUrl={giftImage?.publicUrl}
                        onUpload={uploadGiftImage}
                    />
                </div>

            </div>

            {/* Fees */}
            <div className="mt-[48px] md:mt-[72px] w-[298px] md:w-[447px]">
                <div
                    className={`flex items-center justify-between transition-opacity ${
                        hasAmount ? 'opacity-100' : 'opacity-50'
                    }`}
                >
                    <p className="w-[240px] md:w-[360px] font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">
                        Help the couple receive the full amount — I’ll cover the fees
                    </p>

                    <FeeCoverageToggle
                        value={guestCoversFees}
                        onChange={setGuestCoversFees}
                        disabled={!hasAmount}
                    />
                </div>

                <p className="mt-[5px] md:mt-[7.5px] text-[11px] md:text-[16.5px] text-[#3A3A3A]">
                    {!hasAmount
                        ? 'Enter a gift amount to enable this option'
                        : guestCoversFees
                            ? `Adds approx. ${formatCents(totalFeesCents)} to your total`
                            : 'Fees will be deducted from the gift'}
                </p>
            </div>


            {/* Summary */}
            <div className="mt-[24px] md:mt-[36px]">
                <GiftSummaryCard
                    amountCents={amountCents}
                    guestCoversFees={guestCoversFees}
                />
            </div>

            {/* CTA */}
            <button
                onClick={handleProceedToPayment}
                disabled={!amountCents || !guestName || !message}
                className="mt-[32px] md:mt-[48px] w-[288px] md:w-[432px] h-[55px] md:h-[82.5px] rounded-[14px] md:rounded-[21px]
                bg-[#D8C9A6] text-white font-inter font-medium text-[16px] md:text-[24px] disabled:opacity-60
                transition hover:opacity-90 active:opacity-80 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
                Proceed to Payment
            </button>
        </main>
    )
}
