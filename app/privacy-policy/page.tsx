'use client'
import PageBackground from '@/components/PageBackground'


export default function PrivacyPolicyPage() {
    return (
        <PageBackground>
            <div className="w-full flex justify-center">

                <main className="w-full max-w-[320px] md: max-w-[480px] mt-[40px] md:mt-[60px]">

                    {/* Heading */}
                    <h1
                        className="font-inter font-medium text-[26px] md:text-[39px] tracking-[0.015em] text-[#3A3A3A]
                        text-center"
                    >
                        Privacy Policy
                    </h1>
                    <p className="mt-[12px] md:mt-[18px] font-inter font-regular text-center text-[12px] md:text-[18px] text-[#3A3A3A]/80">
                        Last Updated: 5 January 2026 <br/>
                    </p>

                    {/* Body */}
                    <div
                        className="mt-[24px] md:mt-[36px] font-inter font-normal text-[12px] md:text-[18px] leading-[170%]
                        text-[#3A3A3A]"
                    >

                        <p className="mt-[20px] md:mt-[30px]">
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">
                                1. Information We Collect</strong>
                        </p>

                        <p>
                            <strong className="font-inter font-medium text-[12px] md:text-[18px] text-[#3A3A3A]">
                                <br/>1.1 Information Couples Provide </strong><br/>
                            When creating a wedding page, you may provide:
                        </p>

                        <ul className="list-disc pl-[16px] md:pl-[24px]">
                            <li>Names of the couple</li>
                            <li>Wedding date</li>
                            <li>Your photos</li>
                            <li>Custom messages or page text</li>
                            <li>Email addresses (used for account access, verification, and transactional communication)</li>
                            <li>
                                Bank account details (only through Stripe Connect — we never see or store these)
                            </li>
                        </ul>

                        <p>
                            <strong className="font-inter font-medium text-[12px] md:text-[18px] text-[#3A3A3A]">
                                <br/>1.2 Information
                                Guests Provide</strong><br/>
                            When sending a gift, guests may submit:
                        </p>

                        <ul className="list-disc pl-[16px] md:pl-[24px]">
                            <li>Name</li>
                            <li>Gift amount</li>
                            <li>Message to the couple</li>
                            <li>Photo (optional)</li>
                            <li>Payment information (handled securely by Stripe — not stored by EverGift)</li>
                        </ul>

                        <p>
                            <strong className="font-inter font-medium text-[12px] md:text-[18px] text-[#3A3A3A]">
                                <br/>1.3 Automatically Collected Information</strong><br/>We may automatically collect:
                        </p>

                        <ul className="list-disc pl-[16px] md:pl-[24px]">
                            <li>Device type</li>
                            <li>Browser type</li>
                            <li>IP address</li>
                            <li>Pages visited</li>
                            <li>Date and time of interactions</li>
                        </ul>

                        <p><br/>
                            This information is used in aggregate and is not used to personally identify users unless required for security, fraud prevention, or legal compliance.<br/>
                            <br/> This information helps us operate the platform, improve performance, enhance security,
                            and prevent misuse.

                        </p>

                        <div className="my-[20px] md:my-[30px] w-full h-[1px] md:h-[1.5px] bg-[#3A3A3A]/15"/>


                        <p>
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">
                                2. How We Use Your Information</strong>
                        </p>

                        <p>
                            We use collected information to:
                        </p>

                        <ul className="list-disc pl-[16px] md:pl-[24px]">
                            <li>Create and display your wedding page</li>
                            <li>Process gifts securely via Stripe</li>
                            <li>Send transactional emails related to gift activity, account setup, or important service updates.</li>
                            <li>Verify user accounts and communicate important service-related information</li>
                            <li>Provide customer support</li>
                            <li>Improve our website and services</li>
                            <li>Prevent fraud or misuse</li>
                            <li>We do not send marketing emails without consent</li>
                        </ul>

                        <p>
                            <br/> We never sell your information. By using EverGift, you consent to the collection
                            and use of your information as described in this Privacy Policy. <br/> <br/>

                            We collect and process personal information where necessary to provide our services,
                            comply with legal obligations, and based on user consent.

                        </p>

                        <div className="my-[20px] md:my-[30px] w-full h-[1px] md:h-[1.5px] bg-[#3A3A3A]/15"/>


                        <p>
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">
                                3. Payment Processing (Stripe)</strong>
                        </p>

                        <p>
                            All payments on EverGift are processed by Stripe.
                        </p>

                        <ul className="list-disc pl-[16px] md:pl-[24px]">
                            <li>Payment card details</li>
                            <li>Billing information</li>
                            <li>Identity verification details (for couples receiving payouts)</li>
                        </ul>

                        <p>
                            <br/> EverGift does not process or store credit card information or bank details.
                        </p>

                        <p>
                            <br/> You can review Stripe’s Privacy Policy here:
                            <br/>
                            <span className="underline">
                                https://stripe.com/privacy
                            </span>
                        </p>

                        <div className="my-[20px] md:my-[30px] w-full h-[1px] md:h-[1.5px] bg-[#3A3A3A]/15"/>


                        <p>
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">
                                4. How We Store & Protect Your Information</strong>
                        </p>

                        <p>
                            We take reasonable steps to protect your information, including:
                        </p>

                        <ul className="list-disc pl-[16px] md:pl-[24px]">
                            <li>SSL encryption</li>
                            <li>Secure databases</li>
                            <li>Restricted internal access</li>
                            <li>Stripe’s PCI-compliant payment systems</li>
                        </ul>

                        <p>
                            <br/> However, no online service is 100% secure. By using EverGift, you accept this risk. EverGift is not responsible for
                            unauthorised access caused by factors outside our reasonable control.
                        </p>

                        <div className="my-[20px] md:my-[30px] w-full h-[1px] md:h-[1.5px] bg-[#3A3A3A]/15"/>


                        <p>
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">
                                5. Sharing of Personal Information</strong>
                        </p>

                        <p>
                            We may share information only when necessary:
                        </p>

                        <ul className="list-disc pl-[16px] md:pl-[24px]">
                            <li>Stripe (for payments and payouts)</li>
                            <li>Service providers (hosting, analytics, email delivery)</li>
                        </ul>
                        <br/>
                        EverGift may rely on third-party service providers to operate the platform. These providers only receive information necessary to perform their services.

                        <p>
                            <br/> We do NOT share with:
                        </p>

                        <ul className="list-disc pl-[16px] md:pl-[24px]">
                            <li>Advertisers</li>
                            <li>Third-party marketing companies</li>
                            <li>Any unrelated external parties</li>
                        </ul>

                        <p>
                            <br/> We may disclose information if required by law.
                        </p>

                        <div className="my-[20px] md:my-[30px] w-full h-[1px] md:h-[1.5px] bg-[#3A3A3A]/15"/>


                        <p>
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">
                                6. Data Retention</strong>
                        </p>

                        <p>
                            We retain personal information only as long as necessary:
                        </p>

                        <ul className="list-disc pl-[16px] md:pl-[24px]">
                            <li>Wedding pages remain active unless deleted</li>
                            <li>Gift messages and history stay available to the couple</li>
                            <li>Stripe retains payment records for financial compliance</li>
                        </ul>

                        <p>
                            <br/> Couples may request deletion of their wedding page and personal information,
                            subject to legal and financial record-keeping requirements.

                        </p>

                        <div className="my-[20px] md:my-[30px] w-full h-[1px] md:h-[1.5px] bg-[#3A3A3A]/15"/>


                        <p>
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">
                                7. Couple & Guest Rights</strong>
                        </p>

                        <p>EverGift complies with the Australian Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs). <br/> <br/>
                            Under Australian privacy laws, you have the right to:
                        </p>

                        <ul className="list-disc pl-[16px] md:pl-[24px]">
                            <li>Access your personal information</li>
                            <li>Request correction</li>
                            <li>Request deletion (where legally permitted)</li>
                            <li>Withdraw consent</li>
                            <li>Make a complaint</li>
                        </ul>

                        <p>
                            <br/> Requests can be made by emailing:
                            <br/>
                            <a href="mailto:support@evergift.com.au" className="underline hover:underline">
                                support@evergift.com.au
                            </a>
                        </p>

                        <div className="my-[20px] md:my-[30px] w-full h-[1px] md:h-[1.5px] bg-[#3A3A3A]/15"/>


                        <p>
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">
                                8. Cookies & Tracking</strong>
                        </p>

                        <p>
                            EverGift may use cookies to:
                        </p>

                        <ul className="list-disc pl-[16px] md:pl-[24px]">
                            <li>Keep you logged in</li>
                            <li>Improve performance</li>
                            <li>Analyse site usage</li>
                        </ul>

                        <p>
                            <br/> Cookies can be disabled in your browser, but some features may not work.
                        </p>

                        <div className="my-[20px] md:my-[30px] w-full h-[1px] md:h-[1.5px] bg-[#3A3A3A]/15"/>


                        <p>
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">
                                9. International Data Transfers</strong>
                        </p>

                        <p>
                            Your information may be stored or processed outside Australia (e.g. USA) through service
                            providers like Stripe or cloud hosting.
                        </p>

                        <p>
                            <br/> We ensure transfers comply with Australian privacy requirements.
                        </p>

                        <div className="my-[20px] md:my-[30px] w-full h-[1px] md:h-[1.5px] bg-[#3A3A3A]/15"/>


                        <p>
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">
                                10. Children’s Privacy</strong>
                        </p>

                        <p>
                            EverGift is not intended for individuals under 18 years old.
                            We do not knowingly collect data from children.

                        </p>

                        <div className="my-[20px] md:my-[30px] w-full h-[1px] md:h-[1.5px] bg-[#3A3A3A]/15"/>


                        <p>
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">
                                11. Changes to This Policy</strong>
                        </p>

                        <p>
                            We may update this Privacy Policy periodically.
                            Updates will be posted on this page with a revised “Last Updated” date.

                            <br/>
                            <br/>
                            This Privacy Policy should be read together with EverGift’s Terms & Conditions.

                        </p>

                        <div className="my-[20px] md:my-[30px] w-full h-[1px] md:h-[1.5px] bg-[#3A3A3A]/15"/>


                        <p className="mt-[20px]">
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">
                                12. Contact
                                Us</strong><br/>
                            Need help or have questions?
                            <br/>
                            <br/>
                            If you have any questions or run into issues, our support team is here to help.
                            <br/>
                            <br/>
                            Email us anytime at: <br/>
                            <a href="mailto:support@evergift.com.au" className="underline hover:underline">
                                support@evergift.com.au
                            </a>
                            <br/>
                            <br/>
                            We usually respond within 24 hours.
                            <br/>

                        </p>

                        <div className="my-[20px] md:my-[30px] w-full h-[1px] md:h-[1.5px] bg-[#3A3A3A]/15"/>


                    </div>

                </main>

            </div>
        </PageBackground>
    )
}
