'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabase/client'
import PageBackground from '@/components/PageBackground'
import ImageRecommendationModal from '@/components/ImageRecommendationModal'
import PortraitUploadTile from '@/components/PortraitUploadTile'
import FinalStepChecklist from "@/components/FinalStepChecklist";

type Wedding = {
    id: string
    partner_one_name: string
    partner_two_name: string
    wedding_date: string
    header_text: string
    welcome_message: string
    slug: string
}


export default function EditWeddingForm({ wedding }: { wedding: Wedding }) {
    const supabase = supabaseBrowser()
    const router = useRouter()

    const [partnerOne, setPartnerOne] = useState(wedding.partner_one_name)
    const [partnerTwo, setPartnerTwo] = useState(wedding.partner_two_name)
    const [weddingDate, setWeddingDate] = useState(wedding.wedding_date)
    const [headerText, setHeaderText] = useState(wedding.header_text)
    const [welcomeMessage, setWelcomeMessage] = useState(wedding.welcome_message)

    const [collageImage, setCollageImage] = useState<{
        path: string
        publicUrl: string
    } | null>(null)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showImageHelp, setShowImageHelp] = useState(false)

    const hydratedImageRef = useRef(false)


    const allFieldsCompleted =
        !!partnerOne &&
        !!partnerTwo &&
        !!weddingDate &&
        !! welcomeMessage

    const collageUploaded = !!collageImage

    /* --------------------------------
       Hydrate existing collage image
    -------------------------------- */
    useEffect(() => {
        if (hydratedImageRef.current) return
        hydratedImageRef.current = true

        const loadImage = async () => {
            const { data, error } = await supabase
                .from('images')
                .select('id, storage_path')
                .eq('wedding_id', wedding.id)
                .single()

            if (error || !data) return

            const { data: publicData } = supabase.storage
                .from('wedding-images')
                .getPublicUrl(data.storage_path)

            setCollageImage({
                path: data.storage_path,
                publicUrl: publicData.publicUrl,
            })
        }

        loadImage()
    }, [supabase, wedding.id])

    /* --------------------------------
       Upload / replace collage image
    -------------------------------- */
    const uploadCollageImage = async (file: File) => {
        // 1️⃣ Get existing image (if any)
        const { data: existingImage } = await supabase
            .from('images')
            .select('id, storage_path')
            .eq('wedding_id', wedding.id)
            .single()

        // 2️⃣ Upload new file
        const ext = file.name.split('.').pop()
        const newPath = `collages/${Date.now()}-${Math.random()
            .toString(36)
            .slice(2)}.${ext}`

        const { error: uploadError } = await supabase.storage
            .from('wedding-images')
            .upload(newPath, file)

        if (uploadError) throw uploadError

        // 3️⃣ Update or insert DB row
        if (existingImage) {
            await supabase
                .from('images')
                .update({ storage_path: newPath })
                .eq('id', existingImage.id)

            // 4️⃣ Delete old storage file
            if (existingImage.storage_path) {
                await supabase.storage
                    .from('wedding-images')
                    .remove([existingImage.storage_path])
            }
        } else {
            await supabase.from('images').insert({
                wedding_id: wedding.id,
                storage_path: newPath,
            })
        }

        // 5️⃣ Update preview
        const { data } = supabase.storage
            .from('wedding-images')
            .getPublicUrl(newPath)

        setCollageImage({
            path: newPath,
            publicUrl: data.publicUrl,
        })
    }

    /* --------------------------------
       Save changes
    -------------------------------- */
    const handleSave = async () => {
        setLoading(true)
        setError(null)

        const { error } = await supabase
            .from('weddings')
            .update({
                partner_one_name: partnerOne,
                partner_two_name: partnerTwo,
                wedding_date: weddingDate,
                header_text: headerText,
                welcome_message: welcomeMessage,
            })
            .eq('id', wedding.id)

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }

        router.push('/dashboard')
    }

    return (
        <div className="w-full flex flex-col items-center">
            <h1 className="mt-[40px] font-inter font-medium text-[26px] tracking-[0.015em] text-[#3A3A3A] text-center">
                Edit Your Wedding Page
            </h1>

            <p className="mt-[20px] font-inter text-[15px] leading-[150%] tracking-[0.015em] text-[#3A3A3A] text-center max-w-[320px]">
                Update your wedding details below — changes will be reflected on your <br/>
                wedding page.
            </p>

            {/* Fields */}
            <div className="mt-[40px] flex flex-col gap-[24px] w-[298px]">

                {/* Partner 1 */}
                <div>
                    <label className="block mb-[6px] font-inter font-medium text-[15px] text-[#3A3A3A]">
                        Partner 1 Name
                    </label>
                    <input
                        value={partnerOne}
                        onChange={(e) => setPartnerOne(e.target.value)}
                        placeholder="Name"
                        className="w-full rounded-[10px] bg-white px-[15px] py-[15px] border border-black/10 font-inter text-[15px] placeholder:text-[#3A3A3A]/35 focus:outline-none focus:ring-2 focus:ring-[#D8C9A6]/50"
                    />
                </div>

                {/* Partner 2 */}
                <div>
                    <label className="block mb-[6px] font-inter font-medium text-[15px] text-[#3A3A3A]">
                        Partner 2 Name
                    </label>
                    <input
                        value={partnerTwo}
                        onChange={(e) => setPartnerTwo(e.target.value)}
                        placeholder="Name"
                        className="w-full rounded-[10px] bg-white px-[15px] py-[15px] border border-black/10 font-inter text-[15px] placeholder:text-[#3A3A3A]/35 focus:outline-none focus:ring-2 focus:ring-[#D8C9A6]/50"
                    />
                </div>

                {/* Wedding Date */}
                <div>
                    <label className="block mb-[6px] font-inter font-medium text-[15px] text-[#3A3A3A]">
                        Wedding Date
                    </label>
                    <input
                        type="date"
                        value={weddingDate}
                        onChange={(e) => setWeddingDate(e.target.value)}
                        className="w-full rounded-[10px] bg-white px-[15px] py-[15px] pr-[44px] border border-black/10 font-inter text-[15px] focus:outline-none focus:ring-2 focus:ring-[#D8C9A6]/50 appearance-none"
                    />
                </div>

                {/* Header Text */}
                <div>
                    <label className="block mb-[6px] font-inter font-medium text-[15px] text-[#3A3A3A]">
                        Header Text
                    </label>
                    <input
                        value={headerText}
                        onChange={(e) => setHeaderText(e.target.value)}
                        placeholder="A celebration of love"
                        className="w-full rounded-[10px] bg-white px-[15px] py-[15px] border border-black/10 font-inter text-[15px] placeholder:text-[#3A3A3A]/35 focus:outline-none focus:ring-2 focus:ring-[#D8C9A6]/50"
                    />
                </div>

                {/* Welcome Message */}
                <div>
                    <label className="block mb-[6px] font-inter font-medium text-[15px] text-[#3A3A3A]">
                        Welcome Message
                    </label>
                    <textarea
                        value={welcomeMessage}
                        onChange={(e) => setWelcomeMessage(e.target.value)}
                        placeholder="Thank you for celebrating this special day with us."
                        className="w-full resize-none rounded-[10px] bg-white px-[15px] py-[15px] border border-black/10 font-inter text-[15px] placeholder:text-[#3A3A3A]/35 focus:outline-none focus:ring-2 focus:ring-[#D8C9A6]/50"
                    />
                </div>

                <div className="mt-[16px] flex flex-col gap-[10px]">
                    <p className="font-inter font-medium text-[15px] text-[#3A3A3A]">
                        Your Collage Photos
                    </p>

                    <p className="font-inter text-[11px] tracking-[0.015em] text-[#3A3A3A]">
                        Update your collage photos below.
                    </p>

                    <button
                        type="button"
                        onClick={() => setShowImageHelp(true)}
                        className="text-[11px] text-[#C9A86A] underline w-fit"
                    >
                        ⓘ What images should I upload?
                    </button>

                    <ImageRecommendationModal
                        open={showImageHelp}
                        onClose={() => setShowImageHelp(false)}
                    />
                </div>

                <div className="flex justify-center">
                    <PortraitUploadTile
                        uploadedUrl={collageImage?.publicUrl}
                        onUpload={uploadCollageImage}
                    />
                </div>

                {error && <p className="text-[13px] text-red-600">{error}</p>}


                <FinalStepChecklist
                    allFieldsCompleted={allFieldsCompleted}
                    collageUploaded={collageUploaded}
                    hideStripe
                />


                <button
                    onClick={handleSave}
                    disabled={loading || !partnerOne || !partnerTwo || !weddingDate || !headerText || !welcomeMessage || !collageImage}
                    className="
            mt-[16px]
            shadow-[6px_4px_18px_rgba(0,0,0,0.1)]
            rounded-[14px]
            bg-[#D8C9A6]
            py-[16px]
            font-inter
            font-medium
            text-[16px]
            text-white
            disabled:opacity-60
          "
                >
                    {loading ? 'Updating…' : 'Update My Wedding Page'}
                </button>
            </div>

        </div>


    )
}
