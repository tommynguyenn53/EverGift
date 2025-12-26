

export default function HowEverGiftWorksCard() {
    return (
        <div
            className="
                w-[342px]
                md:w-[513px]
                bg-white
                rounded-[10px]
                md:rounded-[15px]
                flex flex-col
                gap-[22px]
                md:gap-[33px]
                py-[22px]
                px-[17px]
                md:py-[33px]
                md:px-[26px]
                mt-[48px]
                md:mt-[72px]
                shadow-[0px_3px_12px_rgba(0,0,0,0.1)]
              "
        >
            {/* Title */}
            <h2
                className="
                  font-inter
                  font-semibold
                  text-[20px]
                  md:text-[30px]
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
                  md:gap-[25.5px]
                  items-center


                "
            >
                {/* Icons column */}
                <div
                    className="
                        flex flex-col
                        gap-[24px]
                        md:gap-[36px]
                      "
                >
                    <div className="w-[64px] h-[64px] md:w-[96px] md:h-[96px]">
                        <img
                            src="/upload-icon.svg"
                            alt=""
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <div className="w-[64px] h-[64px] md:w-[96px] md:h-[96px]">
                        <img
                            src="/qr-icon.svg"
                            alt=""
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <div className="w-[64px] h-[64px] md:w-[96px] md:h-[96px]">
                        <img
                            src="/gift-icon.svg"
                            alt=""
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>


                {/* Text column */}
                <div
                    className="
                    flex flex-col
                    gap-[24px]
                    md:gap-[36px]
                  "
                >
                    {/* Step 1 */}
                    <div className="flex flex-col gap-[5px] md:gap-[7.5px]">
                        <h3
                            className="
                        font-inter
                        font-semibold
                        text-[15px]
                        md:text-[22.5px]
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
                        md:text-[18px]
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
                    <div className="flex flex-col gap-[5px] md:gap-[7.5px]">
                        <h3
                            className="
                        font-inter
                        font-semibold
                        text-[15px]
                        md:text-[22.5px]
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
                            md:text-[18px]
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
                    <div className="flex flex-col gap-[5px] md:gap-[7.5px]">
                        <h3
                            className="
                            font-inter
                            font-semibold
                            text-[15px]
                            md:text-[22.5px]
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
                            md:text-[18px]
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
