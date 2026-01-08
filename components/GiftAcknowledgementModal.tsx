'use client'

import {useEffect} from "react";

type Props = {
    open: boolean
    onConfirm: () => void
    onClose: () => void
}

export default function GiftAcknowledgementModal({
                                                     open,
                                                     onConfirm,
                                                     onClose,
                                                 }: Props) {
    if (!open) return null

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [open])


    return (
        <div
            className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/40 backdrop-blur-[2px]
        px-[16px]
      "
            style={{ touchAction: 'none' }}
            onClick={onClose}
        >
            <div
                className="
          w-full max-w-[320px] md:max-w-[480px]
          rounded-[14px] md:rounded-[21px]
          bg-white
          px-[18px] md:px-[27px]
          py-[20px] md:py-[30px]
          shadow-[0_10px_40px_rgba(0,0,0,0.18)]
        "
                onClick={(e) => e.stopPropagation()}
            >
                {/* Title */}
                <h2
                    className="
            font-inter font-medium
            text-[18px] md:text-[27px]
            tracking-[0.015em]
            text-[#3A3A3A]
            text-center
          "
                >
                    Before You Continue
                </h2>

                {/* Body */}
                <div
                    className="
            mt-[16px] md:mt-[24px]
            font-inter text-[13px] md:text-[19.5px]
            leading-[160%]
            text-[#3A3A3A]
            flex flex-col gap-[14px] md:gap-[21px]
          "
                >
                    <p>
                        <strong>No refunds.</strong><br/>
                        All gifts are voluntary and final. Refunds are subject to Stripe’s
                        policies and the receiving couple’s discretion.
                    </p>

                    <p>
                        <strong>Fees & totals.</strong><br/>
                        If you choose to cover fees, a small additional amount is added so
                        the couple receives the full gift. Otherwise, platform and Stripe
                        fees are deducted from the gift.
                    </p>

                    <p>
                        <strong>What the couple sees.</strong><br/>
                        Your name, message, and any photo you include will be visible to the
                        couple.
                    </p>

                    <p>
                        <strong>Payments.</strong><br/>
                        Payments are processed securely via Stripe. EverGift does not store
                        your payment details.
                    </p>

                    <p>
                        <strong>Supported cards.</strong><br/>
                        EverGift currently supports Australian-issued cards only.
                        International cards are not supported and may result in incorrect
                        fee calculations or failed payments.
                    </p>

                    <p className="text-[#3A3A3A]/80">
                        For more information, please review our{' '}
                        <a
                            href="/terms&conditions"
                            target="_blank"
                            className="underline text-[#C9A86A] hover:opacity-80"
                        >
                            Terms & Conditions
                        </a>{' '}
                        and{' '}
                        <a
                            href="/privacy-policy"
                            target="_blank"
                            className="underline text-[#C9A86A] hover:opacity-80"
                        >
                            Privacy Policy
                        </a>.
                    </p>
                </div>

                {/* Actions */}
                <div
                    className="
            mt-[30px] md:mt-[45px]
            flex flex-col gap-[10px] md:gap-[15px]
          "
                >
                <button
                        onClick={onConfirm}
                        className="
              w-full h-[44px] md:h-[66px]
              rounded-[12px] md:rounded-[18px]
              bg-[#D8C9A6]
              font-inter font-medium
              text-[15px] md:text-[22.5px]
              text-white
              shadow-[6px_4px_18px_rgba(0,0,0,0.1)]
              transition
              hover:opacity-90
              active:opacity-80
              active:scale-[0.98]
            "
                    >
                        I Understand & Continue
                    </button>

                    <button
                        onClick={onClose}
                        className="
              w-full
              font-inter
              mt-[14px]
              md:mt-[21px]
              text-[13px] md:text-[19.5px]
              text-[#3A3A3A]/70
              hover:opacity-80
            "
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
