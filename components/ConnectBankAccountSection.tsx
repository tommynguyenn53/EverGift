'use client'

import { useState } from 'react'
import StripeOnboardingAccordion from '@/components/StripeOnboardingAccordion'

type ConnectBankAccountSectionProps = {
    onConnect?: () => void
    loading?: boolean
}

export default function ConnectBankAccountSection({
                                                      onConnect,
                                                      loading = false,
                                                  }: ConnectBankAccountSectionProps) {
    const [stripeStepsAcknowledged, setStripeStepsAcknowledged] = useState(false)
    const [finalAcknowledged, setFinalAcknowledged] = useState(false)

    const canConnect = stripeStepsAcknowledged && finalAcknowledged && !loading

    return (
        <div className="mt-[16px] md:mt-[24px] flex flex-col gap-[14px] md:gap-[21px] w-[298px] md:w-[447px]">

            {/* Heading */}
            <p className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">
                Connect your bank account
            </p>

            {/* Helper text */}
            <p className="font-inter font-normal text-[11px] md:text-[16.5px] tracking-[0.015em] text-[#3A3A3A]">
                Connect with Stripe to securely receive payments from your guests.
            </p>

            {/* Stripe onboarding accordion */}
            <StripeOnboardingAccordion
                onAcknowledgeChange={setStripeStepsAcknowledged}
            />

            {/* Final acknowledgement */}
            <label
                className="mt-[6px] md:mt-[9px] flex items-start gap-[15px] md:gap-[22.5px] text-[#3A3A3A]"
            >
                <input
                    type="checkbox"
                    checked={finalAcknowledged}
                    onChange={(e) => setFinalAcknowledged(e.target.checked)}
                    className="w-[16px] h-[16px] md:w-[24px] md:h-[24px] shrink-0 mt-[6px] md:mt-[9px]"
                />

                <span className="font-inter text-[13px] md:text-[19.5px] leading-[170%]"> I have read and acknowledge every step required to connect
                    Stripe and understand how wedding gifts will be processed.
                </span>
            </label>

            {/* CTA */}
            <div className="flex justify-center">
                <button
                    type="button"
                    onClick={onConnect}
                    disabled={!canConnect}
                    className="mt-[12px] md:mt-[18px]
                    w-[250px] md:w-[375px]
                    rounded-[14px] md:rounded-[21px]
                    bg-[#635BFF]
                    py-[14px] md:py-[21px]
                    font-inter font-medium text-[16px] md:text-[24px]
                    text-white
                    shadow-[6px_4px_18px_rgba(0,0,0,0.15)]
                    transition
                    hover:opacity-90
                    active:opacity-80
                    active:scale-[0.98]
                    disabled:opacity-50
                    disabled:cursor-not-allowed"
                >
                    {loading ? 'Connecting…' : 'Connect with Stripe'}
                </button>
            </div>
        </div>
    )
}
