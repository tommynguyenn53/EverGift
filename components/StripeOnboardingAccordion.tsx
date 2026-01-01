'use client'

import { useState } from 'react'

export default function StripeOnboardingAccordion() {
    const [open, setOpen] = useState(false)
    const [copied, setCopied] = useState(false)

    const DESCRIPTION_TEXT =
        'Collecting wedding gifts from family and friends through a digital wedding gifting platform. Funds are gifted to the couple to celebrate their wedding.'

    const copyToClipboard = async (text: string) => {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text)
            return
        }

        // iOS Safari fallback
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.focus()
        textarea.select()

        try {
            document.execCommand('copy')
        } finally {
            document.body.removeChild(textarea)
        }
    }

    const handleCopy = async () => {
        await copyToClipboard(DESCRIPTION_TEXT)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div
            className="mt-[16px] md:mt-[24px] w-full rounded-[14px] md:rounded-[21px]
            bg-white border border-black/5
            shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
        >
            {/* Header */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between
    px-[16px] md:px-[24px] py-[14px] md:py-[21px]
    font-inter font-medium text-[13px] md:text-[19.5px]
    text-[#3A3A3A]"
            >
                <span>What happens when I connect Stripe?</span>

                <img
                    src="/open-icon.svg"
                    alt=""
                    className={`w-[20px] h-[20px] md:w-[36px] md:h-[36px]
        transition-transform duration-300
        ${open ? 'rotate-180' : 'rotate-0'}`}
                />
            </button>

            {/* Animated content */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out
                ${
                    open
                        ? 'max-h-[1400px] opacity-100'
                        : 'max-h-0 opacity-0'
                }`}
            >
                <div
                    className={`px-[16px] md:px-[24px] pb-[18px] md:pb-[27px]
                    font-inter text-[12px] md:text-[18px]
                    leading-[160%] text-[#3A3A3A] space-y-[16px]
                    transition-all duration-300
                    ${open ? 'mt-[6px]' : 'mt-0'}`}
                >
                    {/* Intro */}
                    <p className="text-[#3A3A3A]/80">
                        You’ll be redirected to Stripe to securely set up your payouts.
                        This usually takes <strong>3–5 minutes</strong>.
                    </p>

                    <p className="text-[#3A3A3A]/80">
                        <strong>Only one partner needs to complete this.</strong>{' '}
                        The bank account you add is where all wedding gifts will be paid,
                        so make sure it belongs to the partner who will manage the funds.
                    </p>

                    {/* Step 1 */}
                    <div>
                        <p className="font-medium">Step 1 — Verify your contact details</p>
                        <ul className="mt-[6px] ml-[18px] list-disc text-[#3A3A3A]/80">
                            <li>Enter an email address</li>
                            <li>Add a mobile phone number</li>
                            <li>Confirm the one-time code sent to your phone</li>
                        </ul>
                    </div>

                    {/* Step 2 */}
                    <div>
                        <p className="font-medium">Step 2 — Choose your account type</p>
                        <ul className="mt-[6px] ml-[18px] list-disc text-[#3A3A3A]/80">
                            <li>
                                Business type:{' '}
                                <strong>Individual / Sole trader</strong>
                            </li>
                            <li>
                                Business structure:{' '}
                                <strong>I do not have an ABN</strong>
                            </li>
                        </ul>
                        <p className="mt-[6px] text-[#3A3A3A]/60">
                            This is normal for wedding gift collections — no ABN is required.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div>
                        <p className="font-medium">Step 3 — Personal details</p>
                        <ul className="mt-[6px] ml-[18px] list-disc text-[#3A3A3A]/80">
                            <li>Legal first and last name</li>
                            <li>Date of birth</li>
                            <li>Home address</li>
                            <li>Phone number</li>
                        </ul>
                    </div>

                    {/* Step 4 */}
                    <div>
                        <p className="font-medium">
                            Step 4 — Describe how you’ll use EverGift
                        </p>
                        <ul className="mt-[6px] ml-[18px] list-disc text-[#3A3A3A]/80">
                            <li>
                                Industry:{' '}
                                <strong>Other personal services</strong>
                            </li>
                            <li>Select <strong>“I don’t have a website”</strong></li>
                            <li>Add a short product description instead</li>
                        </ul>

                        <div
                            onClick={handleCopy}
                            className={`mt-[10px] rounded-[10px]
                            p-[10px] cursor-pointer select-none
                            border border-black/5
                            transition-all duration-200
                            ${
                                copied
                                    ? 'bg-[#D8C9A6]/70'
                                    : 'bg-[#F6EEDC]/60 hover:bg-[#F6EEDC]/80'
                            }
                            active:scale-[0.98]`}
                        >
                            <div className="flex items-center justify-between mb-[4px]">
                                <p className="font-medium text-[11px] md:text-[16px]">
                                    Suggested description
                                </p>

                                <p className="text-[10px] md:text-[14px] text-[#3A3A3A]/60">
                                    {copied ? 'Copied ✓' : 'Press to copy'}
                                </p>
                            </div>

                            <p className="italic text-[#3A3A3A]/80">
                                {DESCRIPTION_TEXT}
                            </p>
                        </div>
                    </div>

                    {/* Step 5 */}
                    <div>
                        <p className="font-medium">Step 5 — Add your bank account</p>
                        <ul className="mt-[6px] ml-[18px] list-disc text-[#3A3A3A]/80">
                            <li>BSB</li>
                            <li>Account number</li>
                        </ul>
                        <p className="text-[#3A3A3A]/60">
                            <br/>
                            All wedding gifts will be paid into this account.
                        </p>
                    </div>

                    {/* Footer */}
                    <p className="text-[#3A3A3A]/60">
                        If you exit Stripe early, you can resume setup at any time.
                    </p>

                    <p className="text-[11px] md:text-[16px] text-[#3A3A3A]/50">
                        EverGift never sees or stores your bank or identity details.
                        All sensitive information is handled securely by Stripe.
                    </p>
                </div>
            </div>
        </div>
    )
}
