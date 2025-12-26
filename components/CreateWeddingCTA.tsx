import Link from 'next/link'
import CreateWeddingButton from "@/components/CreateWeddingButton";

export default function CreateWeddingCTA() {
    return (
        <div
            className="
        flex flex-col
        items-center
        text-center
        mt-[48px]
        md:mt-[72px]
      "
        >
            {/* Heading */}
            <h2
                className="
          font-inter
          font-medium
          text-[22px]
          md:text-[33px]
          text-[#3A3A3A]
        "
            >
                Create Your Wedding <br/> Page Today
            </h2>

            {/* Subtext */}
            <p
                className="
          mt-[12px]
          md:mt-[18px]
          font-inter
          font-normal
          text-[11px]
          md:text-[16.5px]
          tracking-[0.015em]
          text-[#999999]
        "
            >
                Takes less than 5 minutes.
            </p>

            {/* CTA Button */}
            <CreateWeddingButton/>
        </div>
    )
}
