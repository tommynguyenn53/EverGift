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
        <div className="mt-[16px] flex flex-col gap-[10px] w-[298px]">

            {/* Heading */}
            <p
                className="
          font-inter
          font-medium
          text-[15px]
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
          w-[250px]
          rounded-[14px]
          bg-[#635BFF]
          py-[14px]
          font-inter
          font-medium
          text-[16px]
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
