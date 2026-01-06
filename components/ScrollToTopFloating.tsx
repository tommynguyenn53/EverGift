'use client'

import { useEffect, useState } from 'react'

export default function ScrollToTopFloating() {
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            setShowButton(window.scrollY > 300)
        }

        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    if (!showButton) return null

    return (
        <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="
                fixed
                bottom-[24px] md:bottom-[36px]
                right-[20px] md:right-[32px]
                z-50
                w-[44px] md:w-[56px]
                h-[44px] md:h-[56px]
                flex items-center justify-center
                rounded-full
                bg-white border-[2px]
                border-[#CBB89B]
                text-[#A89470]
                shadow-[0_6px_20px_rgba(0,0,0,0.18)]
                transition
                hover:opacity-90
                active:opacity-80
                active:scale-[0.95]
            "
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 15l7-7 7 7"
                />
            </svg>
        </button>
    )
}
