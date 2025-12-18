

export default function HowEverGiftWorksCard() {
    return (
        <div
            className="
                w-[342px]
                bg-white
                rounded-[10px]
                flex flex-col
                gap-[22px]
                py-[22px]
                px-[17px]
                mt-[48px]
                shadow-[0px_3px_12px_rgba(0,0,0,0.1)]
              "
        >
            {/* Title */}
            <h2
                className="
                  font-inter
                  font-semibold
                  text-[20px]
                  text-[#3A3A3A]
                  text-center
                "
            >
                How EverGift Works
            </h2>

            {/* Bottom section */}
            <div
                className="
                  flex flex-row
                  gap-[17px]

                  items-center


                "
            >
                {/* Icons column */}
                <div
                    className="
                    flex flex-col
                    gap-[24px]
                  "
                >
                    {/* Icon placeholders */}
                    <div className="w-[64px] h-[64px]">
                        <img src="/upload-icon.svg"/>

                    </div>

                    <img src="/qr-icon.svg"/>
                    <img src="/gift-icon.svg"/>
                </div>

                {/* Text column */}
                <div
                    className="
                    flex flex-col
                    gap-[24px]
                  "
                >
                    {/* Step 1 */}
                    <div className="flex flex-col gap-[5px]">
                        <h3
                            className="
                        font-inter
                        font-semibold
                        text-[15px]
                        text-[#3A3A3A]
                        text-left
                      "
                        >
                            Step 1 – Create Your Page
                        </h3>
                        <p
                            className="
                        font-inter
                        font-normal
                        text-[12px]
                        leading-[150%]
                        text-[#3A3A3A]/80
                        text-left
                      "
                        >
                            Upload your photos, enter your details, and personalise your
                            wedding gifting page in minutes.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col gap-[5px]">
                        <h3
                            className="
                        font-inter
                        font-semibold
                        text-[15px]
                        text-[#3A3A3A]
                        text-left
                      "
                        >
                            Step 2 – Share Your QR Code
                        </h3>
                        <p
                            className="
                            font-inter
                            font-normal
                            text-[12px]
                            leading-[150%]
                            text-[#3A3A3A]/80
                            text-left
                          "
                        >
                            Add it to invitations, menus, signage, or send it directly to your
                            guests.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col gap-[5px]">
                        <h3
                            className="
                            font-inter
                            font-semibold
                            text-[15px]
                            text-[#3A3A3A]
                            text-left
                          "
                        >
                            Step 3 – Receive Gifts Instantly
                        </h3>
                        <p
                            className="
                            font-inter
                            font-normal
                            text-[12px]
                            leading-[150%]
                            text-[#3A3A3A]/80
                            text-left
                          "
                        >
                            Guests can send a gift within seconds. Funds go straight to your
                            bank account via Stripe.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
