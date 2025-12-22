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
        <div className="flex items-center gap-[12px]">
            <img
                src={done ? '/done-icon.svg' : '/notDone-icon.svg'}
                alt={done ? 'Done' : 'Not done'}
                className="w-[18px] h-[18px]"
            />
            <p
                className="
          font-inter
          font-normal
          text-[14px]
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
        <div className="mt-[16px]">
            {/* Heading */}
            <p
                className="
          font-inter
          font-medium
          text-[15px]
          text-[#3A3A3A]
        "
            >
                Final Step
            </p>

            {/* Checklist */}
            <div className="mt-[12px] flex flex-col gap-[8px]">
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
