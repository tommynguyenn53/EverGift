export default function HowPricingWorks() {
    return (
        <div
            className="
        flex flex-col
        gap-[12px]
        text-center
        mt-[48px]
      "
        >
            {/* Title */}
            <h2
                className="
          font-inter
          font-medium
          text-[22px]
          text-[#3A3A3A]
        "
            >
                How Pricing Works
            </h2>

            {/* Subtitle */}
            <p
                className="
          font-inter
          font-normal
          text-[11px]
          tracking-[0.015em]
          text-[#999999]
        "
            >
                Simple, transparent, and fair for everyone.
            </p>

            {/* Fee line */}
            <p
                className="
          font-inter
          font-medium
          text-[12px]
          text-[#3A3A3A]
        "
            >
                EverGift Fee: 4% per gift
            </p>

            {/* Explanation */}
            <p
                className="
          font-inter
          font-normal
          text-[12px]
          text-[#3A3A3A]
        "
            >
                Guests can choose to cover the fee — <br/> or the couple receives slightly less.
            </p>

            <p
                className="
          font-inter
          font-normal
          text-[12px]
          text-[#3A3A3A]
        "
            >
                Guest cover fees: Couple receives full amount
            </p>

            <p
                className="
          font-inter
          font-normal
          text-[12px]
          text-[#3A3A3A]
        "
            >
                Guest does not cover fees: Couple receives <br/> gift minus fees
            </p>

            {/* Footer note */}
            <p
                className="
          font-inter
          font-normal
          text-[11px]
          text-[#3A3A3A]/75
        "
            >
                All payments are processed securely with Stripe.
            </p>
        </div>
    )
}
