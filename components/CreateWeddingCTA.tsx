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
      "
        >
            {/* Heading */}
            <h2
                className="
          font-inter
          font-medium
          text-[22px]
          text-[#3A3A3A]
        "
            >
                Create Your Wedding <br/> Page Today
            </h2>

            {/* Subtext */}
            <p
                className="
          mt-[12px]
          font-inter
          font-normal
          text-[11px]
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
