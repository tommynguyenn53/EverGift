'use client'

type Props = {
    pageUrl: string
}

export default function WeddingReadyActions({ pageUrl }: Props) {
    const copyLink = async () => {
        await navigator.clipboard.writeText(pageUrl)
        alert('Link copied!')
    }

    return (
        <div className="mt-[24px] grid grid-cols-2 gap-[20px] justify-center">

            <a
                href={pageUrl}
                className="
          w-[150px]
          h-[55px]
          flex items-center justify-center
          shadow-[6px_4px_18px_rgba(0,0,0,0.1)]
          rounded-[14px]
          bg-[#D8C9A6]
          font-inter
          font-medium
          text-[16px]
          text-white
          transition
          hover:opacity-90
          active:scale-[0.98]
        "
            >
                View Live Page
            </a>

            <button
                onClick={copyLink}
                className="
          w-[150px]
          h-[55px]
          flex items-center justify-center
          shadow-[6px_4px_18px_rgba(0,0,0,0.1)]
          rounded-[14px]
          bg-[#D8C9A6]
          font-inter
          font-medium
          text-[16px]
          text-white
          transition
          hover:opacity-90
          active:scale-[0.98]
        "
            >
                Share Page Link
            </button>

            <a
                href="/edit-wedding"
                className="
          w-[150px]
          h-[55px]
          flex items-center justify-center
          shadow-[6px_4px_18px_rgba(0,0,0,0.1)]
          rounded-[14px]
          bg-[#D8C9A6]
          font-inter
          font-medium
          text-[16px]
          text-white
          transition
          hover:opacity-90
          active:scale-[0.98]
        "
            >
                Edit Wedding
            </a>

            <a
                href="/dashboard"
                className="
          w-[150px]
          h-[55px]
          flex items-center justify-center
          shadow-[6px_4px_18px_rgba(0,0,0,0.1)]
          rounded-[14px]
          bg-[#D8C9A6]
          font-inter
          font-medium
          text-[16px]
          text-white
          transition
          hover:opacity-90
          active:scale-[0.98]
        "
            >
                Dashboard
            </a>
        </div>
    )
}
