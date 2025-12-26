const benefits = [
    {
        icon: '/elegant-icon.svg',
        title: 'Modern & Elegant',
        description:
            'EverGift turns your wedding gift-giving into a beautiful, personalised experience your guests will love.',
    },
    {
        icon: '/lock-icon.svg',
        title: 'Secure Payments',
        description:
            'All gifts are processed through Stripe, the global leader in online payment security.',
    },
    {
        icon: '/no-cash-icon.svg',
        title: 'No Cash, No Hassle',
        description:
            'Guests can give instantly from their phone — no envelopes, no ATMs, no awkward transfers.',
    },
    {
        icon: '/personalised-icon.svg',
        title: 'Fully Personalised',
        description:
            'Add your photos, customise your message, and create a wedding page that feels truly yours.',
    },
]

export default function BenefitCards() {
    return (
        <div
            className="
                flex flex-col
                gap-[20px]
                md:gap-[30px]
                mt-[24px]
                md:mt-[36px]
              "
        >
            {benefits.map((benefit) => (
                <div
                    key={benefit.title}
                    className="
                    flex flex-col
                    items-center
                    text-center
                  "
                >
                    {/* Icon */}
                    <img
                        src={benefit.icon}
                        alt=""
                        className="w-[72px] h-[72px] md:w-[108px] md:h-[108px]"
                    />

                    {/* Text group */}
                    <div className="flex flex-col gap-[10px] md:gap-[15px]">
                        <h3
                            className="
                            font-inter
                            font-medium
                            text-[17px]
                            md:text-[25.5px]
                            text-[#3A3A3A]
                            text-center
                            width-[233px]
                          "
                        >
                            {benefit.title}
                        </h3>

                        <p
                            className="
                            font-inter
                            font-normal
                            text-[12px]
                            md:text-[18px]
                            leading-[150%]
                            text-[#3A3A3A]
                            w-[233px]
                            md:w-[349.5px]
                          "
                        >
                            {benefit.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}
