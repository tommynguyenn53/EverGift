
'use client'

type StripeStatusCardProps = {
    stripeAccountId: string | null
    payoutEnabled: boolean
    weddingId: string
}

export default function StripeStatusCard({weddingId,
                                             stripeAccountId,
                                             payoutEnabled,
                                         }: StripeStatusCardProps) {
    let status
    let description
    let color
    let icon

    const handleOpenStripeDashboard = async () => {
        if (!stripeAccountId) return

        const res = await fetch('/api/stripe/express-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ weddingId }),
        })

        if (!res.ok) {
            console.error(await res.text())
            return
        }

        const data = await res.json()

        if (data.url) {
            window.location.href = data.url
        }
    }


    if (!stripeAccountId) {
        status = 'Not connected'
        description = 'Connect Stripe to start receiving wedding gifts.'
        color = 'text-red-600'
    } else if (!payoutEnabled) {
        status = 'Setup in progress'
        description =
            'Your Stripe account is connected, but setup is not finished yet.'
        color = 'text-[#C9A86A]'
    } else {
        status = 'Ready to receive gifts'
        description =
            'Your Stripe account is fully set up and can receive payments. You can view your Stripe dashboard with the link below.'
        color = 'text-green-600'
    }

    return (
        <div
            className="mt-[32px] md:mt-[48px] w-[280px] md:w-[420px]
            rounded-[14px] md:rounded-[21px] bg-white px-[20px] md:px-[30px]
            py-[18px] md:py-[27px] shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
        >
            <div className="flex flex-col gap-[8px] md:gap-[12px]">
                <p
                    className={`font-inter font-medium text-[15px] md:text-[22.5px] ${color}`}
                >
                    {icon} Stripe status — {status}
                </p>

                <p className="font-inter text-[12px] md:text-[18px] text-[#3A3A3A]/70">
                    {description}
                </p>

                <p className="font-inter text-[12px] md:text-[18px] text-[#3A3A3A]/70">For first-time users, Stripe may ask you to verify your email before you can access all dashboard
                    features. </p>

                {payoutEnabled && stripeAccountId && (
                    <button
                        onClick={handleOpenStripeDashboard}
                        className="mt-[8px] w-fit font-inter font-medium
                        text-[12px] md:text-[18px]
                        text-[#C9A86A] underline transition hover:opacity-80 active:opacity-60"
                    >
                        View Stripe dashboard
                    </button>
                )}
            </div>
        </div>
    )
}
