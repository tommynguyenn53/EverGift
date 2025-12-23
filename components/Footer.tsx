import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="w-full mt-[32px]">
            {/* Stripe logo */}
            <div className="flex justify-center">
                <a
                    href="https://stripe.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src="/stripe-logo.svg"
                        alt="Stripe"
                        className="h-[32px]"
                    />
                </a>
            </div>

            {/* Footer content */}
            <div
                className="
          mt-[12px]
          flex flex-col
          gap-[15px]
          text-left
        "
            >
                <p className="font-inter text-[11px] text-[#7D7D7D]">
                    EverGift © 2025
                </p>

                <p className="font-inter text-[11px] text-[#7D7D7D]">
                    A simpler way to share the love
                </p>

                <div
                    className="
                        flex flex-wrap
                        gap-[10px]
                        font-inter
                        text-[11px]
                        text-[#7D7D7D]

                      "
                >
                    <Link href="/terms&conditions" className="hover:underline
                        transition
                        hover:opacity-80
                        active:opacity-60

                        ">
                        Terms &amp; Conditions
                    </Link>
                    {' '}•{' '}

                    <Link href="/privacy-policy" className="hover:underline
                        transition
                        hover:opacity-80
                        active:opacity-60

                        ">
                        Privacy Policy
                    </Link>
                    {' '}•{' '}

                    <a href="mailto:support@evergift.com" className="hover:underline">
                        Contact Us
                    </a>
                </div>


                <a
                    href="https://stripe.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        font-inter
                        text-[11px]
                        text-[#7D7D7D]
                        hover:underline
                        transition
                        hover:opacity-80
                        active:opacity-60
                      "
                >
                    Powered securely by Stripe
                </a>

                <p className="font-inter text-[11px] text-[#7D7D7D]">
                    No account needed – instant &amp; secure
                </p>
            </div>
        </footer>
    )
}
