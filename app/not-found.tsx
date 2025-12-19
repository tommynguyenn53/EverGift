import Link from 'next/link'
import PageBackground from '@/components/PageBackground'

export default function NotFound() {
    return (
        <PageBackground>

            <main>
                <div className="w-full max-w-sm flex flex-col items-center text-center">

                    {/* Heading */}
                    <h1
                        className="
              mt-[40px]
              font-inter
              font-medium
              text-[26px]
              tracking-[0.015em]
              text-[#3A3A3A]
            "
                    >
                        This Page Isn’t Available
                    </h1>

                    {/* Error icon */}
                    <img
                        src="/fail-mark-icon.svg"
                        alt=""
                        className="mt-[24px]"
                    />

                    {/* Main message */}
                    <p
                        className="
              mt-[24px]
              font-inter
              font-normal
              text-[15px]
              leading-[150%]
              tracking-[0.015em]
              text-[#3A3A3A]
            "
                    >
                        The wedding link you followed may be <br/> incorrect,
                        expired, or no longer active.
                    </p>

                    {/* CTA */}
                    <Link
                        href="/"
                        className="
              shadow-[6px_4px_18px_rgba(0,0,0,0.1)]
              mt-[40px]
              inline-flex
              items-center
              justify-center
              rounded-[14px]
              bg-[#D8C9A6]
              px-[42px]
              py-[16px]
              font-inter
              font-medium
              text-[16px]
              text-white
              transition
              duration-150
              hover:opacity-90
              active:opacity-80
              active:scale-[0.98]
            "
                    >
                        Return to EverGift Homepage
                    </Link>

                    {/* Secondary help text */}
                    <p
                        className="
              mt-[16px]
              font-inter
              font-normal
              text-[11px]
              leading-[150%]
              tracking-[0.015em]
              text-[#3A3A3A]
            "
                    >
                        If you believe this link should still be active, <br/>
                        please contact the couple or EverGift support.
                    </p>

                </div>
            </main>
        </PageBackground>
    )
}
