import AppHeader from '@/components/AppHeader'
import Footer from '@/components/Footer'

export const metadata = {
    title: 'About EverGift — A Modern Wedding Gifting Platform',
    description:
        'EverGift is a modern alternative to wedding wishing wells. Guests send gifts digitally with messages and photos, all organised in one place.',
}

export default function AboutEverGiftPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#EDE0C3] via-[#F6EEDC] to-[#FFFEFA] px-[24px] py-[20px]">
            <AppHeader />

            <main className="mx-auto max-w-[720px] flex flex-col items-center text-center">
                {/* Hero */}
                <h1 className="mt-[48px] md:mt-[72px] font-inter font-medium text-[28px] md:text-[42px] leading-[130%] tracking-[0.015em] text-[#3A3A3A]">
                    A modern alternative to wedding wishing wells
                </h1>

                <p className="mt-[20px] md:mt-[30px] font-inter text-[15px] md:text-[22.5px] leading-[150%] tracking-[0.015em] text-[#3A3A3A]">
                    EverGift lets couples create a single wedding gifting page where guests
                    can send their gift digitally, include a message or photo, and
                    everything goes straight to the couple.
                </p>

                <a
                    href="#how-it-works"
                    className="mt-[24px] md:mt-[36px] inline-flex items-center justify-center
                    rounded-[14px] md:rounded-[21px]
                    bg-white border-[1.5px] border-[#CBB89B]
                    px-[36px] py-[18px] md:px-[93px] md:py-[27px]
                    font-inter font-medium text-[16px] md:text-[24px]
                    text-[#A89470]
                    shadow-[6px_4px_18px_rgba(0,0,0,0.1)]
                    transition hover:bg-[#FAF6F0] active:scale-[0.98]"
                >
                    See how it works
                </a>

                {/* Walkthrough Video */}
                <section className="mt-[56px] md:mt-[84px] w-full flex flex-col items-center">
                    <div
                        className="
                            w-full h-full
                            max-w-[360px] md:max-w-[420px]
                            overflow-hidden
                            rounded-[10px]
                            bg-[#f7f2e9]
                            shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                        "
                    >
                        <iframe
                            src="https://player.vimeo.com/video/1159529065?=1&autoplay=0&loop=1&title=0&byline=0&portrait=0"
                            className="w-full h-[640px] md:h-[720px]"
                            title="EverGift Overview"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                        />
                    </div>

                    <p className="mt-[16px] md:mt-[24px] font-inter text-[13px] md:text-[18px] leading-[150%] text-[#3A3A3A]/70 text-center max-w-[420px]">
                        A quick overview of how EverGift works — from creating your wedding
                        page to guests sending their gift.
                    </p>
                </section>


                {/* How It Works */}
                <section
                    id="how-it-works"
                    className="mt-[72px] md:mt-[108px] w-full"
                >
                    <h2 className="font-inter font-medium text-[22px] md:text-[33px] text-[#3A3A3A] text-left md:text-center">
                        Simple for couples. Easy for guests.
                    </h2>

                    <div className="mt-[20px] md:mt-[28px] space-y-[20px] md:space-y-[28px] text-left md:text-center">
                        <div>
                            <p className="font-inter font-medium text-[#3A3A3A]">
                                Create a personalised wedding page
                            </p>
                            <p className="mt-[4px] text-[#3A3A3A]/70">
                                Add your names, wedding details, and a photo — this becomes your single gifting page.
                            </p>
                        </div>

                        <div>
                            <p className="font-inter font-medium text-[#3A3A3A]">
                                Share your QR code with guests
                            </p>
                            <p className="mt-[4px] text-[#3A3A3A]/70">
                                Display it on a card, sign, or screen at your wedding.
                            </p>
                        </div>

                        <div>
                            <p className="font-inter font-medium text-[#3A3A3A]">
                                Guests send their gift digitally
                            </p>
                            <p className="mt-[4px] text-[#3A3A3A]/70">
                                Guests choose an amount, add a message or photo, and send their gift in seconds.
                            </p>
                        </div>

                        <div>
                            <p className="font-inter font-medium text-[#3A3A3A]">
                                Everything appears in one dashboard
                            </p>
                            <p className="mt-[4px] text-[#3A3A3A]/70">
                                All gifts, messages, and photos are organised in one place.
                            </p>
                        </div>

                        <div>
                            <p className="font-inter font-medium text-[#3A3A3A]">
                                Funds go directly to the couple
                            </p>
                            <p className="mt-[4px] text-[#3A3A3A]/70">
                                Payments are handled securely and paid straight to your bank account.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Why Couples */}
                <section className="mt-[72px] md:mt-[108px] w-full text-left">
                    <h3 className="font-inter font-medium text-[20px] md:text-[30px] text-[#3A3A3A] text-left md:text-center">
                        Why couples use EverGift
                    </h3>

                    <div className="mt-[20px] md:mt-[28px] space-y-[20px] md:space-y-[28px] md:text-center">
                        <div>
                            <p className="font-inter font-medium text-[#3A3A3A]">
                                No envelopes or wishing wells
                            </p>
                            <p className="mt-[4px] text-[#3A3A3A]/70">
                                Everything is handled digitally — no cash, cards, or physical setup.
                            </p>
                        </div>

                        <div>
                            <p className="font-inter font-medium text-[#3A3A3A]">
                                No tracking gifts after the wedding
                            </p>
                            <p className="mt-[4px] text-[#3A3A3A]/70">
                                Gifts, messages, and photos are automatically organised in one place.
                            </p>
                        </div>

                        <div>
                            <p className="font-inter font-medium text-[#3A3A3A]">
                                No awkward cash handling
                            </p>
                            <p className="mt-[4px] text-[#3A3A3A]/70">
                                Guests send their gift digitally, before or on the day.
                            </p>
                        </div>

                        <p className="text-[#3A3A3A]/70">
                            It’s one less thing to think about — before and after the wedding.
                        </p>
                    </div>
                </section>

                {/* Why Guests */}
                <section className="mt-[72px] md:mt-[108px] w-full text-left">
                    <h3 className="font-inter font-medium text-[20px] md:text-[30px] text-[#3A3A3A] text-left md:text-center">
                        Why guests love it
                    </h3>

                    <div className="mt-[20px] md:mt-[28px] space-y-[20px] md:space-y-[28px] md:text-center">
                        <div>
                            <p className="font-inter font-medium text-[#3A3A3A]">
                                No need to bring cash
                            </p>
                            <p className="mt-[4px] text-[#3A3A3A]/70">
                                Guests can send their gift securely from their phone.
                            </p>
                        </div>

                        <div>
                            <p className="font-inter font-medium text-[#3A3A3A]">
                                No last-minute ATM runs
                            </p>
                            <p className="mt-[4px] text-[#3A3A3A]/70">
                                Everything can be done in seconds, from anywhere.
                            </p>
                        </div>

                        <div>
                            <p className="font-inter font-medium text-[#3A3A3A]">
                                Add a personal touch
                            </p>
                            <p className="mt-[4px] text-[#3A3A3A]/70">
                                Include a message or photo alongside the gift.
                            </p>
                        </div>

                        <p className="text-[#3A3A3A]/70">
                            Simple, personal, and stress-free.
                        </p>
                    </div>
                </section>

                {/* Trust */}
                <section className="mt-[72px] md:mt-[108px] w-full text-left">
                    <h3 className="font-inter font-medium text-[20px] md:text-[30px] text-[#3A3A3A] text-left md:text-center">
                        Trust & security
                    </h3>

                    <div className="mt-[20px] md:mt-[28px] space-y-[20px] md:space-y-[28px] md:text-center">
                        <div>
                            <p className="font-inter font-medium text-[#3A3A3A]">
                                Payments handled securely by Stripe
                            </p>
                            <p className="mt-[4px] text-[#3A3A3A]/70">
                                All transactions are processed by Stripe, a global payments provider.
                            </p>
                        </div>

                        <div>
                            <p className="font-inter font-medium text-[#3A3A3A]">
                                Funds go directly to the couple
                            </p>
                            <p className="mt-[4px] text-[#3A3A3A]/70">
                                Gifts are paid straight into the couple’s bank account — EverGift never holds funds.
                            </p>
                        </div>

                        <div>
                            <p className="font-inter font-medium text-[#3A3A3A]">
                                No sensitive details stored
                            </p>
                            <p className="mt-[4px] text-[#3A3A3A]/70">
                                EverGift does not store card or bank information.
                            </p>
                        </div>

                        <p className="text-[#3A3A3A]/70">
                            EverGift exists solely to facilitate digital wedding gifting — nothing more, nothing less.
                        </p>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="mt-[72px] md:mt-[108px]">
                    <h3 className="font-inter font-medium text-[22px] md:text-[33px] text-[#3A3A3A]">
                        Planning a wedding?
                    </h3>

                    <p className="mt-[12px] md:mt-[18px] font-inter text-[15px] md:text-[22.5px] text-[#3A3A3A]/80">
                        Create your EverGift page and take one more thing off your list.
                    </p>

                    <a
                        href="/auth/signup"
                        className="     shadow-[6px_4px_18px_rgba(0,0,0,0.1)]
                mt-[24px] md:mt-[36px]
                inline-flex items-center justify-center
                rounded-[14px] md:rounded-[21px]
                bg-[#D8C9A6]
                px-[36px] py-[18px] md:px-[93px] md:py-[27px]
                font-inter font-medium text-[16px] md:text-[24px]
                text-white
                transition
                hover:bg-[#D8C9A6]
                active:bg-[#D8C9A6]
                hover:opacity-90
                active:opacity-80
                active:scale-[0.98]
                disabled:opacity-50
                disabled:cursor-not-allowed"
                    >
                        Create your EverGift page
                    </a>
                </section>
            </main>

            <Footer />
        </div>
    )
}
