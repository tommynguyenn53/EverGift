import Link from 'next/link'
import PageBackground from '@/components/PageBackground'

export default function NotFound() {
    return (
        <PageBackground>
            <div className="w-full max-w-sm mx-auto flex flex-col items-center">

                <main>
                    <div className="w-full max-w-sm flex flex-col items-center text-center">

                        {/* Heading */}
                        <h1
                            className="md:w-[500px] mt-[40px] md:mt-[60px] font-inter font-medium text-[26px] md:text-[39px]
                            tracking-[0.015em] text-[#3A3A3A]"
                        >
                            This Page Isn’t Available
                        </h1>

                        {/* Error icon */}
                        <img
                            src="/fail-mark-icon.svg"
                            alt=""
                            className="mt-[24px] md:-[36px] md:w-[108px]"
                        />

                        {/* Main message */}
                        <p
                            className="mt-[24px] md:mt-[36px] w-[300px] md:w-[450px] font-inter font-normal text-[15px]
                            md:text-[22.5px] leading-[150%] tracking-[0.015em] text-[#3A3A3A]"
                        >
                            The wedding link you followed may be incorrect,
                            expired, or no longer active.
                        </p>

                        {/* CTA */}
                        <Link
                            href="/"
                            className="md:w-[450px] shadow-[6px_4px_18px_rgba(0,0,0,0.1)] mt-[40px] md:mt-[60px]
                            inline-flex items-center justify-center rounded-[14px] md:rounded-[21px] bg-[#D8C9A6]
                            px-[42px] py-[16px] md:px-[63px] md:py-[20px] font-inter font-medium text-[16px] md:text-[24px]
                            text-white transition duration-150 hover:opacity-90 active:opacity-80 active:scale-[0.98]"
                        >
                            Return to EverGift Homepage
                        </Link>

                        {/* Secondary help text */}
                        <p
                            className="mt-[16px] md:mt-[24px] font-inter font-normal text-[11px] md:text-[16.5px]
                            leading-[150%] tracking-[0.015em] text-[#3A3A3A]"
                        >
                            If you believe this link should still be active, <br/>
                            please contact the couple or EverGift support.
                        </p>

                    </div>
                </main>
            </div>

        </PageBackground>
    )
}
