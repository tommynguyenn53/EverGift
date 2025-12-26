'use client'

type PortraitUploadTileProps = {
    uploadedUrl?: string
    onUpload: (file: File) => void
}

export default function PortraitUploadTile({
                                               uploadedUrl,
                                               onUpload,
                                           }: PortraitUploadTileProps) {
    return (
        <label
            className="
        shrink-0
        w-[229px]
        md:w-[343.5px]
        h-[344px]
        md:h-[516px]
        bg-black/5
        border border-black/15
        flex items-center justify-center
        cursor-pointer
        overflow-hidden
        transition
        hover:bg-black/10
        active:scale-[0.98]
      "
        >
            <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) onUpload(file)
                }}
            />

            {uploadedUrl ? (
                <img
                    src={uploadedUrl}
                    alt="Uploaded collage"
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="flex flex-col items-center gap-[8px] md:gap-[14px]">
          <span className="font-inter font-medium text-[24px] md:text-[36px] tracking-[0.015em] text-black/40">
            +
          </span>
                    <span className="font-inter font-normal text-[12px] md:text-[18px] tracking-[0.015em] text-black/40">
            Upload collage
          </span>
                </div>
            )}
        </label>
    )
}
