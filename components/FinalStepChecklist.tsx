// components/FinalStepChecklist.tsx
'use client'

type FinalStepChecklistProps = {
    allFieldsCompleted: boolean
    collageUploaded: boolean
    stripeConnected: boolean
    hideStripe?: boolean

}

function ChecklistItem({
                           done,
                           label,
                       }: {
    done: boolean
    label: string
}) {
    return (
        <div className="flex items-center gap-[12px] md:gap-[18px]">
            <img
                src={done ? '/done-icon.svg' : '/notDone-icon.svg'}
                alt={done ? 'Done' : 'Not done'}
                className="w-[18px] h-[18px] md:w-[27px] md:h-[27px]"
            />
            <p
                className="
          font-inter
          font-normal
          text-[14px]
          md:text-[21px]
          tracking-[0.015em]
          text-[#3A3A3A]
        "
            >
                {label}
            </p>
        </div>
    )
}

export default function FinalStepChecklist({
                                               allFieldsCompleted,
                                               collageUploaded,
                                               stripeConnected,
                                                hideStripe
                                           }: FinalStepChecklistProps) {
    return (
        <div className="mt-[16px] md:mt-[24px]">
            {/* Heading */}
            <p
                className="
          font-inter
          font-medium
          text-[15px]
          md:text-[22.5px]
          text-[#3A3A3A]
        "
            >
                Final Step
            </p>

            {/* Checklist */}
            <div className="mt-[12px] md:mt-[18px] flex flex-col gap-[8px] md:gap-[14px]">
                <ChecklistItem
                    done={allFieldsCompleted}
                    label="All required fields completed"
                />
                <ChecklistItem
                    done={collageUploaded}
                    label="Collage uploaded"
                />
                {!hideStripe && (
                    <ChecklistItem
                        done={stripeConnected}
                        label="Stripe account connected"
                    />
                )}
            </div>
        </div>
    )
}
