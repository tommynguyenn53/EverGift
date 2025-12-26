'use client'

import { useEffect } from 'react'

type ImageRecommendationModalProps = {
    open: boolean
    onClose: () => void
}

export default function ImageRecommendationModal({
                                                     open,
                                                     onClose,
                                                 }: ImageRecommendationModalProps) {

    // ✅ iOS scroll lock (CORRECT placement)
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [open])

    if (!open) return null

    return (
        <div
            className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/10
        pointer-events-auto
      "
            style={{ touchAction: 'none' }}
            onClick={onClose}
        >
            <div
                className="
          relative
          w-[298px]
          md:w-[447px]
          max-h-[450px]
          md:max-h-[675px]
          overflow-y-auto
          rounded-[10px]
          md:rounded-[15px]
          bg-white
          px-[20px]
          py-[20px]
          md:px-[30px]
          md:py-[30px]
          flex
          flex-col
          gap-[12px]
          md:gap-[18px]
          pointer-events-auto
        "
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="
                    absolute
                    top-[12px]
                    right-[12px]
                    md:top-[18px]
                    w-[32px]
                    h-[32px]
                    md:w-[48px]
                    md:h-[48px]
                    flex
                    items-center
                    justify-center
                    text-[#3A3A3A]
                    text-[18px]
                    md:text-[27px]
                    rounded-full
                    hover:bg-black/5
                    active:bg-black/10
                    transition
                  "
                    aria-label="Close"
                >
                    ×
                </button>

                <p className="font-inter text-[11px] md:text-[16.5px] tracking-[0.015em] text-[#3A3A3A]">
                    <strong className="">
                        Create your collage (recommended tools)
                    </strong>
                </p>

                <p className="font-inter text-[11px] md:text-[16.5px] leading-[150%] tracking-[0.015em] text-[#3A3A3A]">
                    We suggest creating your collage using a design tool, then uploading the final image:
                </p>

                <ul className="list-disc pl-[16px] space-y-[6px] md:space-y-[9px] font-inter text-[11px] md:text-[16.5px] leading-[150%] tracking-[0.015em] text-[#3A3A3A]">
                    <li>
                        <a
                            href="https://www.canva.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:opacity-80 transition"
                        >
                            Canva
                        </a>{' '}
                        — Easy templates, mobile & desktop
                    </li>

                    <li>
                        <a
                            href="https://www.adobe.com/express"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:opacity-80 transition"
                        >
                            Adobe Express
                        </a>{' '}
                        — Clean layouts, quick exports
                    </li>

                    <li>
                        <a
                            href="https://www.figma.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:opacity-80 transition"
                        >
                            Figma
                        </a>{' '}
                        — More control for custom layouts
                    </li>
                </ul>

                <p className="font-inter text-[11px] md:text-[16.5px] tracking-[0.015em] text-[#3A3A3A]">
                    <strong>Recommended image size:</strong>
                </p>

                <ul className="list-disc pl-[16px] space-y-[6px] md:space-y-[9px] font-inter text-[11px] md:text-[16.5px] leading-[150%] tracking-[0.015em] text-[#3A3A3A]">
                    <li>Portrait orientation required</li>
                    <li>Ideal size: 1200 × 1800 px or larger</li>
                    <li>Phone camera photos in portrait mode work perfectly</li>
                </ul>

                <p className="font-inter text-[11px] md:text-[16.5px] tracking-[0.015em] text-[#3A3A3A]">
                    <strong>Accepted formats:</strong>
                </p>

                <ul className="list-disc pl-[16px] space-y-[6px] md:space-y-[9px] font-inter text-[11px] md:text-[16.5px] leading-[150%] tracking-[0.015em] text-[#3A3A3A]">
                    <li>JPG, PNG, HEIC, HEIF</li>
                </ul>

                <p className="font-inter text-[11px] md:text-[16.5px] tracking-[0.015em] text-[#3A3A3A]">
                    <strong>Collage layout:</strong>
                </p>

                <ul className="list-disc pl-[16px] space-y-[6px] md:space-y-[9px] font-inter text-[11px] md:text-[16.5px] leading-[150%] tracking-[0.015em] text-[#3A3A3A]">
                    <li>Upload one finished portrait collage</li>
                    <li>The image will be automatically cropped to fit the hero area</li>
                    <li>Keep key details (faces, text) centred vertically</li>
                    <li>Avoid placing important content near the very top or bottom edges</li>
                </ul>

                <p className="font-inter text-[11px] md:text-[16.5px] tracking-[0.015em] text-[#3A3A3A]">
                    <strong>Avoid low-quality images:</strong>
                </p>

                <ul className="list-disc pl-[16px] space-y-[6px] md:space-y-[9px] font-inter text-[11px] md:text-[16.5px] leading-[150%] tracking-[0.015em] text-[#3A3A3A]">
                    <li>Screenshots or zoomed-in photos may appear blurry</li>
                    <li>Try to upload original photos from your camera roll</li>
                    <li>Export your collage at the highest quality setting</li>
                </ul>

                <p className="font-inter text-[11px] md:text-[16.5px] tracking-[0.015em] text-[#3A3A3A]">
                    <strong>Maximum file size:</strong>
                </p>

                <ul className="list-disc pl-[16px] space-y-[6px] md:space-y-[9px] font-inter text-[11px] md:text-[16.5px] leading-[150%] tracking-[0.015em] text-[#3A3A3A]">
                    <li>Up to 10 MB per photo</li>
                </ul>
            </div>
        </div>
    )
}
