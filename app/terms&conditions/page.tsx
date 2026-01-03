import PageBackground from '@/components/PageBackground'

export default function TermsPage() {
    return (
        <PageBackground>

            <main className="w-full flex justify-center">
                <div className="w-full max-w-[320px] md: max-w-[480px] mt-[40px] md:mt-[60px]">

                    {/* Page title */}
                    <h1
                        className="font-inter font-medium text-[26px] md:text-[39px] tracking-[0.015em] text-[#3A3A3A]
                        text-center"
                    >
                        Terms & Conditions
                    </h1>

                    {/* Body */}
                    <div
                        className="mt-[24px] md:mt-[36px] font-inter font-normal text-[12px] md:text-[18px] leading-[170%]
                        text-[#3A3A3A]"
                    >

                        {/* 1 */}
                        <p className="mt-[20px] md:mt-[30px] ">
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">1.
                                Information Provided</strong><br/>
                            When creating a wedding page, you may provide:
                            <br/>• Names of the couple
                            <br/>• Wedding date
                            <br/>• Collage photo
                            <br/>• Custom messages or page text
                            <br/>• Email address
                            <br/><br/>
                            Bank account details are linked through Stripe Connect — we never see or store this
                            information.
                        </p>

                        <div className="my-[20px] md:my-[30px] w-full h-[1px] md:h-[1.5px] bg-[#3A3A3A]/15"/>


                        {/* 2 */}
                        <p className="mt-[20px] md:mt-[30px]">
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">2.
                                Eligibility</strong><br/>
                            To use EverGift, you must:
                            <br/>• Be at least 18 years old
                            <br/>• Use the service for lawful purposes
                            <br/>• Provide accurate and truthful information
                            <br/><br/>
                            Only couples who successfully connect Stripe accounts may accept gifts.
                        </p>

                        <div className="my-[20px] md:my-[30px] w-full h-[1px] md:h-[1.5px] bg-[#3A3A3A]/15"/>

                        <p className="mt-[20px] md:mt-[30px]">
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">3.
                                Privacy
                            </strong><br/>
                            EverGift collects and uses personal information in accordance with its Privacy Policy.
                            By using the platform, you consent to the collection and use of your information as described in that policy.

                        </p>


                        <div className="my-[20px] md:my-[30px] w-full h-[1px] md:h-[1.5px] bg-[#3A3A3A]/15"/>


                        {/* 3 */}
                        <p className="mt-[20px] md:mt-[30px]">
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">4.
                                Wedding Pages &
                                User Content</strong><br/>
                            Couples may upload:
                            <br/>• Photos
                            <br/>• Names
                            <br/>• Wedding date
                            <br/>• Custom messages
                            <br/><br/>
                            By uploading content, you confirm:
                            <br/>• You own the rights to the content OR have permission to use it
                            <br/>• The content does not violate copyright laws
                            <br/>• Illegal material is not permitted
                            <br/><br/>
                            We reserve the right to remove or disable content that violates these Terms.
                        </p>

                        <div className="my-[20px] md:my-[30px] w-full h-[1px] md:h-[1.5px] bg-[#3A3A3A]/15"/>


                        {/* 4 */}
                        <p className="mt-[20px] md:mt-[30px]">
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">5.
                                Gifts &
                                Payments<br/></strong><br/>
                            <strong className="font-inter font-medium text-[12px] md:text-[18px] text-[#3A3A3A]">5.1
                                Payment
                                Processing</strong><br/>
                            All payments are processed securely by Stripe. EverGift does not store payment details.
                            <br/><br/>
                            <strong className="font-inter font-medium text-[12px] md:text-[18px] text-[#3A3A3A]">5.2
                                Platform
                                Fees</strong><br/>
                            EverGift charges a platform fee on each gift. This fee is disclosed before payment.
                            <br/><br/>
                            <strong className="font-inter font-medium text-[12px] md:text-[18px] text-[#3A3A3A]">5.3
                                Availability of
                                Payouts</strong><br/>
                            Gifts are transferred to the couple’s connected Stripe account. Payout timing is controlled
                            by Stripe.
                            <br/><br/>
                            <strong className="font-inter font-medium text-[12px] md:text-[18px] text-[#3A3A3A]">5.4
                                Stripe Terms</strong><br/>
                            Payments made through EverGift are also subject to Stripe’s terms and conditions.
                            Stripe may impose additional requirements or restrictions.
                            <br/><br/>
                            <strong className="font-inter font-medium text-[12px] md:text-[18px] text-[#3A3A3A]">5.5
                                Refunds</strong><br/>
                            All gifts are voluntary and final unless:
                            <br/>• Required by law
                            <br/>• Approved by the couple
                            <br/>• Stripe issues a refund due to fraud or payment failure

                            <br/>
                            <br/>
                            EverGift acts solely as a platform facilitating gifts between guests and couples. EverGift
                            is not a party to any gift transaction and does not control or guarantee outcomes between
                            users.

                        </p>

                        <div className="my-[20px] md:my-[30px] w-full h-[1px] md:h-[1.5px] bg-[#3A3A3A]/15"/>


                        {/* 5 */}
                        <p className="mt-[20px] md:mt-[30px]">
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">6.
                                Responsibilities of
                                Couples</strong><br/>
                            Couples are responsible for:
                            <br/>• Providing accurate wedding information
                            <br/>• Moderating and managing messages
                            <br/>• Ensuring gift links are accurate
                            <br/><br/>
                            EverGift does not guarantee outcomes between guests and couples beyond
                            facilitating the gifting platform.

                        </p>

                        <div className="my-[20px] md:my-[30px] w-full h-[1px] md:h-[1.5px] bg-[#3A3A3A]/15"/>


                        {/* 6 */}
                        <p className="mt-[20px] md:mt-[30px]">
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">7.
                                Responsibilities of
                                Guests</strong><br/>
                            Guests agree to:
                            <br/>• Provide accurate payment details
                            <br/>• Avoid sending fraudulent or offensive messages
                            <br/>• Not abuse or misuse gifting features
                        </p>

                        <div className="my-[20px] md:my-[30px] w-full h-[1px] md:h-[1.5px] bg-[#3A3A3A]/15"/>


                        {/* 7 */}
                        <p className="mt-[20px] md:mt-[30px]">
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">8.
                                Prohibited
                                Conduct</strong><br/>
                            Users must NOT:
                            <br/>• Upload offensive or illegal content
                            <br/>• Harass or impersonate others
                            <br/>• Attempt to exploit or disrupt EverGift systems
                        </p>

                        <div className="my-[20px] md:my-[30px] w-full h-[1px] md:h-[1.5px] bg-[#3A3A3A]/15"/>

                        {/* 8 */}

                        <p className="mt-[20px] md:mt-[30px]">
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">
                                9. No Refund Policy
                            </strong>
                            <br/>
                            Except as outlined in Section 5.5, all gifts made through EverGift are final.
                            <br/>
                            <br/>
                            Guests are shown all gift amounts and applicable fees before confirming payment.
                        </p>

                        <div className="my-[20px] md:my-[30px] w-full h-[1px] md:h-[1.5px] bg-[#3A3A3A]/15"/>


                        {/* 9 */}
                        <p className="mt-[20px] md:mt-[30px]">
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">10.
                                Intellectual
                                Property</strong><br/>
                            EverGift owns:
                            <br/>• Website design
                            <br/>• Branding
                            <br/>• Logos
                            <br/><br/>
                            Couples retain ownership of their uploaded content.
                        </p>

                        <div className="my-[20px] md:my-[30px] w-full h-[1px] md:h-[1.5px] bg-[#3A3A3A]/15"/>


                        {/* 10 */}
                        <p className="mt-[20px] md:mt-[30px]">
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">11.
                                Service
                                Availability</strong><br/>
                            We strive to maintain continuous access but do not guarantee uninterrupted service.
                        </p>

                        <div className="my-[20px] md:my-[30px] w-full h-[1px] md:h-[1.5px] bg-[#3A3A3A]/15"/>


                        {/* 11 */}
                        <p className="mt-[20px] md:mt-[30px]">
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">12.
                                Limitation of
                                Liability</strong><br/>
                            EverGift is not liable for:
                            <br/>• Lost or delayed payments
                            <br/>• Stripe processing issues
                            <br/>• Content posted by users
                        </p>

                        <div className="my-[20px] md:my-[30px] w-full h-[1px] md:h-[1.5px] bg-[#3A3A3A]/15"/>


                        {/* 12 */}
                        <p className="mt-[20px] md:mt-[30px]">
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">13.
                                Indemnification</strong><br/>
                            You agree to indemnify EverGift against claims arising from your use of the platform.
                        </p>

                        <div className="my-[20px] md:my-[30px] w-full h-[1px] md:h-[1.5px] bg-[#3A3A3A]/15"/>


                        {/* 13 */}
                        <p className="mt-[20px] md:mt-[30px]">
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">14.
                                Termination</strong><br/>
                            EverGift may suspend or terminate accounts that violate these Terms.
                        </p>

                        <div className="my-[20px] md:my-[30px] w-full h-[1px] md:h-[1.5px] bg-[#3A3A3A]/15"/>


                        {/* 14 */}
                        <p className="mt-[20px] md:mt-[30px]">
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">15.
                                Changes to These
                                Terms</strong><br/>
                            We may update these Terms periodically. Continued use constitutes acceptance.
                        </p>

                        <div className="my-[20px] md:my-[30px] w-full h-[1px] md:h-[1.5px] bg-[#3A3A3A]/15"/>


                        {/* 15 */}
                        <p className="mt-[20px] md:mt-[30px]">
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">16.
                                Governing
                                Law</strong><br/>
                            These Terms are governed by the laws of New South Wales, Australia.
                        </p>

                        <div className="my-[20px] md:my-[30px] w-full h-[1px] md:h-[1.5px] bg-[#3A3A3A]/15"/>


                        {/* 16 */}
                        <p className="mt-[20px] md:mt-[30px]">
                            <strong className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">17.
                                Contact
                                Us</strong><br/>
                            Need help?
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
                </div>
            </main>
        </PageBackground>
    )
}
