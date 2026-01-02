import AppHeader from '@/components/AppHeader'
import PageBackground from '@/components/PageBackground'
import Link from "next/link";
import HowEverGiftWorksCard from "@/components/HowEverGiftWorksCard";
import BenefitCards from "@/components/BenefitCards";
import HowPricingWorks from "@/components/HowPricingWorks";
import CreateWeddingCTA from "@/components/CreateWeddingCTA";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";


export default function HomePage() {
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
                        className="mt-[48px] md:mt-[72px] font-inter font-medium text-[22px] md:text-[39px] leading-tight
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
                        className="shadow-[6px_4px_18px_rgba(0,0,0,0.1)] mt-[32px] md:mt-[48px] inline-flex items-center
                        justify-center rounded-[14px] md:rounded-[21px] bg-white border-[1.5px] border-[#CBB89B]
                        px-[62px] py-[18px] md:px-[93px] md:py-[27px] font-inter font-medium text-[16px] md:text-[24px]
                        text-[#A89470] transition hover:bg-[#FAF6F0] active:bg-[#FAF6F0] duration-150 hover:opacity-90
                        active:opacity-80 active:scale-[0.98]"
                    >
                        View Example Page
                    </Link>


                    <FAQSection/>
                </section>

                {/* other sections go here */}

            </main>
        </PageBackground>
    )
}
