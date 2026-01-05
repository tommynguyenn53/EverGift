'use client'


import PageBackground from '@/components/PageBackground'
import Link from "next/link";
import HowEverGiftWorksCard from "@/components/HowEverGiftWorksCard";
import BenefitCards from "@/components/BenefitCards";
import HowPricingWorks from "@/components/HowPricingWorks";
import CreateWeddingCTA from "@/components/CreateWeddingCTA";
import FAQSection from "@/components/FAQSection";
import { useEffect, useState } from 'react'


export default function HomePage() {
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            setShowButton(window.scrollY > 300)
        }

        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <PageBackground>

            {/* PAGE CONTAINER */}
            <main className="mx-auto max-w-[1200px] px-6">

                {/* HERO */}
                <section className="flex flex-col items-center text-center">
                    <h1
                        className="mt-[40px] md:mt-[60px] font-inter font-medium text-[28px] md:text-[39px] leading-tight
                        tracking-[0.015em] text-[#3A3A3A]"
                    >
                        A Beautiful Way to<br/>
                        Receive Wedding Gifts
                    </h1>

                    <h3
                        className="mt-[20px] md:mt-[30px] font-inter font-regular text-[15px] md:text-[22.5px]
                        leading-normal tracking-[0.015em] max-w-[318px] md:max-w-[478.5px] text-[#3A3A3A]"

                    >
                        Create a personalised gifting page your guests will love — no cash, no envelopes,<br/>
                        no stress.


                    </h3>

                    <div className="w-full flex justify-center">
                        <CreateWeddingCTA/>
                    </div>




                    <div className="">
                        <HowEverGiftWorksCard/>
                    </div>


                    <h1
                        className="mt-[64px] md:mt-[96px] font-inter font-medium text-[22px] md:text-[39px] leading-tight
                        tracking-[0.015em] text-[#3A3A3A]"
                    >
                        Why Couples Love EverGift
                    </h1>

                    <div className="w-full flex justify-center">
                        <BenefitCards/>
                    </div>


                    <div className="w-full flex justify-center">
                        <HowPricingWorks/>
                    </div>

                    <Link
                        href="/example"
                        className="shadow-[6px_4px_18px_rgba(0,0,0,0.1)] mt-[48px] md:mt-[72px] inline-flex items-center
                        justify-center rounded-[14px] md:rounded-[21px] bg-[#D8C9A6]
                        px-[62px] py-[18px] md:px-[93px] md:py-[27px] font-inter font-medium text-[16px] md:text-[24px]
                        text-white transition hover:bg-[#FAF6F0] duration-150 hover:opacity-90
                        active:opacity-80 active:scale-[0.98]"
                    >
                        View Example Page
                    </Link>


                    <FAQSection/>
                </section>

                {/* other sections go here */}
                {/* Floating Back to Top */}
                {showButton && (
                    <button
                        onClick={scrollToTop}
                        aria-label="Back to top"
                        className="
                            fixed
                            bottom-[24px] md:bottom-[36px]
                            right-[20px] md:right-[32px]
                            z-50
                            w-[44px] md:w-[56px]
                            h-[44px] md:h-[56px]
                            flex items-center justify-center
                            rounded-full
                            bg-white border-[2px]
                            border-[#CBB89B]
                            text-[#A89470]
                            shadow-[0_6px_20px_rgba(0,0,0,0.18)]
                            transition
                            hover:opacity-90
                            active:opacity-80
                            active:scale-[0.95]
                        "
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 15l7-7 7 7"
                            />
                        </svg>
                    </button>
                )}

            </main>
        </PageBackground>
    )
}
