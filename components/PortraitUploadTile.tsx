'use client'

import { useState } from 'react'

type PortraitUploadTileProps = {
    uploadedUrl?: string
    onUpload: (file: File) => Promise<void> | void
}

export default function PortraitUploadTile({
                                               uploadedUrl,
                                               onUpload,
                                           }: PortraitUploadTileProps) {
    const [isUploading, setIsUploading] = useState(false)

    return (
        <label
            className={`shrink-0 w-[229px] md:w-[343.5px] h-[344px] md:h-[516px] bg-black/5 border border-black/15
        flex items-center justify-center cursor-pointer overflow-hidden transition 
        hover:bg-black/10 active:scale-[0.98]
        ${isUploading ? 'pointer-events-none opacity-70' : ''}`}
        >
            <input
                type="file"
                accept="image/*"
                hidden
                onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return

                    setIsUploading(true)
                    await onUpload(file) // supports async
                    setIsUploading(false)
                }}
            />

            {/* --- Uploading State --- */}
            {isUploading ? (
                <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 border-4 border-black/20 border-t-black/60 rounded-full animate-spin" />
                    <span className="font-inter text-[12px] md:text-[16px] text-black/60">
            Uploading…
          </span>
                </div>
            ) : uploadedUrl ? (
                <img
                    src={uploadedUrl}
                    alt="Uploaded collage"
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="flex flex-col items-center gap-[8px] md:gap-[14px]">
          <span className="font-inter font-medium text-[24px] md:text-[36px] text-black/40">
            +
          </span>
                    <span className="font-inter text-[12px] md:text-[18px] text-black/40">
            Upload collage
          </span>
                </div>
            )}
        </label>
    )
}
