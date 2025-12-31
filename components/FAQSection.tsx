import { FAQItem } from './FAQItem'

export default function FAQSection() {
    const faqs = [
        {
            q: 'Is EverGift safe for sending and receiving money?',
            a: 'Absolutely. All payments are processed through Stripe, one of the most secure and trusted payment platforms in the world. Your details and your guests are fully encrypted.',
        },
        {
            q: 'Do guests need an EverGift account to send a gift?',
            a: 'No accounts, no logins, no hassle. Guests simply scan a QR code, choose an amount, and send their gift securely in under a minute.',
        },
        {
            q: 'What payment methods do you support?',
            a: 'We support: Apple Pay, Google Pay, Samsung Pay, Visa, Mastercard, AMEX, International cards. Anything Stripe supports — EverGift supports too.',
        },
        {
            q: 'How does the 5% platform fee work?',
            a: 'EverGift charges a 5% platform fee per gift. Guests can choose to cover the fee. If they prefer not to, the fee simply comes out of the gift amount — the couple never pays out of pocket.',
        },
        {
            q: 'When do we receive the money?',
            a: 'Funds are transferred automatically to the couple’s nominated bank account through Stripe. Payout timing varies slightly, but typically lands within 2–3 business days.',
        },
        {
            q: 'Can we personalise our wedding page?',
            a: 'Yes! You can customise: Banner header. Welcome message. The full photo collage layout. Gift options & messaging. Your page will feel elegant, personal, and completely unique to your wedding.',
        },
        {
            q: 'Can guests leave a personal message with their gift?',
            a: 'Absolutely. Guests can include a heartfelt note along with their gift — and you’ll see it displayed beautifully on your dashboard or success notifications.',
        },
        {
            q: 'What if a guest’s payment fails?',
            a: 'They’ll see a friendly “Something Went Wrong” page and can simply try again using a different payment method.',
        },
        {
            q: 'Do we need any technical setup?',
            a: 'Nope — everything is done automatically. Just create your page, connect your bank account (via Stripe), and your QR code is generated instantly.',
        },
    ]

    return (
        <section className="flex flex-col items-center mt-[48px] md:mt-[72px]">
            <h2
                className="font-inter font-medium text-[22px] md:text-[33px] text-[#3A3A3A] text-center"
            >
                Frequently Asked Questions
            </h2>

            <div className="mt-[24px] md:mt-[36px] flex flex-col gap-[10px] md:gap-[15px]">
                {faqs.map((faq, i) => (
                    <FAQItem
                        key={i}
                        index={i + 1}
                        question={faq.q}
                        answer={faq.a}
                    />
                ))}
            </div>
        </section>
    )
}
