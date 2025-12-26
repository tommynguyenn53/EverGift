'use client'

type ConnectBankAccountSectionProps = {
    onConnect?: () => void
    loading?: boolean
}

export default function ConnectBankAccountSection({
                                                      onConnect,
                                                      loading = false,
                                                  }: ConnectBankAccountSectionProps) {
    return (
        <div className="mt-[16px] md:mt-[24px] flex flex-col gap-[10px] md:gap-[15px] w-[298px] md:w-[447px]">

            {/* Heading */}
            <p
                className="
          font-inter
          font-medium
          text-[15px]
          md:text-[22.5px]
          text-[#3A3A3A]
        "
            >
                Connect your bank account
            </p>

            {/* Helper text */}
            <p
                className="
          font-inter
          font-normal
          text-[11px]
          md:text-[16.5px]
          tracking-[0.015em]
          text-[#3A3A3A]
        "
            >
                Connect with Stripe to securely receive payments from
                your guests.
            </p>

            {/* CTA */}
            <div className="flex justify-center">
            <button
                type="button"
                onClick={onConnect}
                disabled={loading}
                className="
          mt-[16px]
          md:mt-[24px]
          w-[250px]
          md:w-[375px]
          rounded-[14px]
          md:rounded-[21px]
          bg-[#635BFF]
          py-[14px]
          md:py-[21px]
          font-inter
          font-medium
          text-[16px]
          md:text-[24px]
          text-white
          shadow-[6px_4px_18px_rgba(0,0,0,0.15)]
          transition
          hover:opacity-90
          active:opacity-80
          active:scale-[0.98]
          disabled:opacity-60
          disabled:cursor-not-allowed
        "
            >
                {loading ? 'Connecting…' : 'Connect with Stripe'}
            </button>
            </div>
        </div>
    )
}
