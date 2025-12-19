import PageBackground from '@/components/PageBackground'
import ExampleBackground from "@/components/ExampleBackground";

export default function ExampleWeddingPage() {
    return (
        <ExampleBackground>

            <main>
                <div className="w-full max-w-sm flex flex-col items-center text-center">

                    {/* Heading */}
                    <h1
                        className="
                        playfair-display-heading_text
                          mt-[32px]
                          font-playfair
                          font-normal
                          text-[36px]
                          tracking-[0.015em]
                          text-[#3A3A3A]
                        "
                    >
                        Tony &amp; Sarah
                    </h1>

                    {/* Date */}
                    <p
                        className="
                        playfair-display-date_text
                          mt-[12px]
                          font-playfair
                          font-normal
                          text-[20px]
                          tracking-[0.015em]
                          text-[#3A3A3A]
                        "
                    >
                        27 June 2035
                    </p>

                    {/* Collage */}
                    <img
                        src="/collage-example.png"
                        alt="Wedding photo collage"
                        className="mt-[32px] w-[229px] h-[344px]"
                    />

                    {/* Message */}
                    <p
                        className="
                          playfair-display-body_text
                          mt-[32px]
                          font-playfair
                          font-normal
                          text-[15px]
                          leading-[150%]
                          text-[#3A3A3A]
                        "
                    >
                        Thank you for celebrating this <br/> special day with us.
                        <br/>
                        <br/>
                        Your presence means the world. If you’d <br/> like to leave a gift,
                        you can do so below.
                    </p>

                    {/* Disabled CTA */}
                    <button
                        disabled
                        className="
                          shadow-[6px_4px_18px_rgba(0,0,0,0.1)]
                          mt-[24px]
                          inline-flex
                          items-center
                          justify-center
                          rounded-[14px]
                          bg-[#D8C9A6]
                          px-[62px]
                          py-[16px]
                          font-inter
                          font-medium
                          text-[16px]
                          text-white
                          opacity-100
                          cursor-not-allowed
                        "
                        >
                            Give a Gift
                        </button>

                        <a
                            href="/"
                            className="
                            mt-[20px]
                            font-inter
                            font-medium
                            text-[15px]
                            tracking-[0.015em]
                            text-[#C9A86A]
                            underline
                            underline-offset-2
                            transition
                            hover:opacity-80
                            active:opacity-60
                          "
                        >
                            Back to EverGift homepage
                        </a>


                </div>
            </main>
        </ExampleBackground>
    )
}
