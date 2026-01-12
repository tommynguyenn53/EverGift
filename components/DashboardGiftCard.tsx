'use client'

import { useState } from 'react'

type Props = {
    guestName: string | null
    amount: string
    message: string | null
    date: string
    imageUrl: string | null
}

export default function DashboardGiftCard({
                                              guestName,
                                              amount,
                                              message,
                                              date,
                                              imageUrl,
                                          }: Props) {
    const [showImage, setShowImage] = useState(false)

    return (
        <div
            className="w-[270px] md:w-[405px]
      rounded-[10px] md:rounded-[15px]
      bg-white px-[15px] md:px-[22.5px]
      py-[15px] md:py-[22.5px]"
        >
            <div className="flex flex-col gap-[10px] md:gap-[15px]">
                <p className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">
                    {guestName ?? 'Guest'} — {amount}
                </p>

                <p className="font-inter italic text-[15px] md:text-[22.5px] text-[#3A3A3A]">
                    {message ? `"${message}"` : '"No message"'}
                </p>


                <p className="font-inter text-[13px] md:text-[19.5px] text-[#3A3A3A]/70">
                    {date}
                </p>

                {/* Image toggle */}
                {imageUrl && (
                    <>
                        <button
                            type="button"
                            onClick={() => setShowImage((v) => !v)}
                            className="w-fit font-inter text-[12px] md:text-[18px]
              text-[#C9A86A] hover:opacity-80 transition active:opacity-60"
                        >
                            {showImage ? 'Hide photo' : 'View photo'}
                        </button>

                        {showImage && (
                            <div className="mt-[6px] overflow-hidden rounded-[10px]">
                                <img
                                    src={imageUrl}
                                    alt="Gift photo"
                                    className="w-full object-cover"
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
