import { FAQItem } from './FAQItem'

export default function FAQSection() {
    const faqs = [
        {
            q: 'What is EverGift?',
            a: 'EverGift is a digital wedding gifting platform that makes it easy for guests to contribute meaningful gifts and messages to a couple — all in one place. ' +
                'The couple receives the funds directly into their bank account, helping them celebrate their wedding in the way that matters most to them. No apps, no guest accounts, no complicated setup — just a simple, modern way to give.'
        },
        {
            q: 'Is EverGift safe for sending and receiving money?',
            a: 'Absolutely. All payments are processed through Stripe, one of the most secure and trusted payment platforms in the world. Your details and your guests are fully encrypted.',
        },
        {
            q: 'What can guests do on our wedding page?',
            a: 'Guests can\n' +
                '\n' +
                'send a monetary gift securely through Stripe,' +
                '\n' +
                'include a personal message with their gift,' +
                '\n' +
                'optionally upload a photo to share with the couple.' +
                '\n' +
                'All gifts and messages are delivered directly to the couple, and any shared photos are private and only visible to them.',
        },
        {
            q: 'Do guests need an EverGift account to send a gift?',
            a: 'No accounts, no logins, no hassle. Guests simply scan a QR code, choose an amount, and send their gift securely in under a minute.',
        },
        {
            q: 'What payment methods do you support?',
            a: 'We support: Apple Pay, Google Pay, Visa, Mastercard, AMEX. Anything Stripe supports — EverGift supports too.',
        },
        {
            q: 'How does the 5% platform fee work?',
            a: 'EverGift charges a 5% platform fee on each gift to support the platform. Guests can choose whether to cover the fees at checkout. If they don’t, the platform and Stripe processing fees are simply deducted from the gift amount, ' +
                'and the couple never pays anything out of their own pocket. If a guest chooses to cover the fees, the total increases slightly because Stripe’s processing fee is calculated based on the final payment amount allowing the couple to receive the full amount.',
        },
        {
            q: 'When do we receive the money?',
            a: 'Funds are transferred automatically to the couple’s nominated bank account through Stripe. Payout timing varies slightly, but typically lands within 2–3 business days. ' +
                'Once your wedding page is created, you’ll also be able to access your Stripe dashboard, where you can manage payout details and view your estimated payout dates.',
        },
        {
            q: 'Can we personalise our wedding page?',
            a: 'Yes! You can customise your banner header, welcome message and upload your own photo. Your page will feel elegant, personal, and completely unique to your wedding.',
        },
        {
            q: 'What if a guest’s payment fails?',
            a: 'If a payment doesn’t go through, Stripe will show a clear message explaining what went wrong and prompt the guest to try again or use a different payment method. No gift is created unless the payment is successful.',
        },
        {
            q: 'Do we need any technical setup?',
            a: 'No — everything is done automatically. Just create your page, connect your bank account (via Stripe), and your QR code is generated instantly.',
        },
        {
            q: 'Do we offer refunds?',
            a: 'EverGift does not offer refunds. Once a gift is completed, the funds are processed and sent directly to the couple. As a digital gifting service, all details and fees are shown clearly before a gift is confirmed.',
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
