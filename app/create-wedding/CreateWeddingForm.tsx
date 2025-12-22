'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import { useEffect, useRef } from 'react'
import {supabaseBrowser} from '@/lib/supabase/client'
import {generateWeddingSlug} from '@/lib/utils/slug'
import PageBackground from '@/components/PageBackground'
import ImageRecommendationModal from '@/components/ImageRecommendationModal'
import PortraitUploadTile from '@/components/PortraitUploadTile'
import ConnectBankAccountContainer from "@/components/ConnectBankAccountContainer";
import FinalStepChecklist from "@/components/FinalStepChecklist";




type CreateWeddingFormProps = {
    wedding: {
        id: string
        partner_one_name: string | null
        partner_two_name: string | null
        wedding_date: string | null
        header_text: string | null
        welcome_message: string | null
        stripe_account_id: string | null
        payout_enabled: boolean
    }
}


export default function CreateWeddingForm({ wedding }: CreateWeddingFormProps) {
    const supabase = supabaseBrowser()
    const router = useRouter()


    const stripeConnected = !!wedding.stripe_account_id
    const payoutEnabled = !!wedding.payout_enabled


    const [partnerOne, setPartnerOne] = useState(wedding.partner_one_name ?? '')
    const [partnerTwo, setPartnerTwo] = useState(wedding.partner_two_name ?? '')
    const [weddingDate, setWeddingDate] = useState(wedding.wedding_date ?? '')
    const [headerText, setHeaderText] = useState(wedding.header_text ?? '')
    const [welcomeMessage, setWelcomeMessage] = useState(wedding.welcome_message ?? '')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showImageHelp, setShowImageHelp] = useState(false)


    const weddingId = wedding.id
    const hydratedRef = useRef(false)
    const imageHydratedRef = useRef(false)


    const allFieldsCompleted =
        !!partnerOne &&
        !!partnerTwo &&
        !!weddingDate &&
        !! welcomeMessage

    useEffect(() => {
        if (hydratedRef.current) return
        hydratedRef.current = true

        setPartnerOne(wedding.partner_one_name ?? '')
        setPartnerTwo(wedding.partner_two_name ?? '')
        setWeddingDate(wedding.wedding_date ?? '')
        setHeaderText(wedding.header_text ?? '')
        setWelcomeMessage(wedding.welcome_message ?? '')
    }, [wedding])

    useEffect(() => {
        if (imageHydratedRef.current) return
        imageHydratedRef.current = true

        const loadCollageImage = async () => {
            const { data: image, error } = await supabase
                .from('images')
                .select('storage_path')
                .eq('wedding_id', wedding.id)
                .single()

            if (error || !image) return

            const { data } = supabase.storage
                .from('wedding-images')
                .getPublicUrl(image.storage_path)

            setCollageImage({
                path: image.storage_path,
                publicUrl: data.publicUrl,
            })
        }

        loadCollageImage()
    }, [wedding.id, supabase])



    const [collageImage, setCollageImage] = useState<{
        path: string
        publicUrl: string
    } | null>(null)

    const collageUploaded = !!collageImage


    const uploadCollageImage = async (file: File) => {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`
        const filePath = `collages/${fileName}`

        const { error: uploadError } = await supabase.storage
            .from('wedding-images')
            .upload(filePath, file)

        if (uploadError) {
            throw new Error(uploadError.message)
        }

        const { error: dbError } = await supabase
            .from('images')
            .upsert(
                {
                    wedding_id: weddingId,
                    storage_path: filePath,
                },
            )

        if (dbError) {
            throw new Error(dbError.message)
        }

        const { data } = supabase.storage
            .from('wedding-images')
            .getPublicUrl(filePath)

        setCollageImage({
            path: filePath,
            publicUrl: data.publicUrl,
        })
    }


    const saveDraft = async () => {
        await supabase
            .from('weddings')
            .update({
                partner_one_name: partnerOne,
                partner_two_name: partnerTwo,
                wedding_date: weddingDate,
                header_text: headerText,
                welcome_message: welcomeMessage,
            })
            .eq('id', weddingId)
    }


    // CHANGED: now PUBLISHES the draft wedding
    const handleCreate = async () => {
        setLoading(true)
        setError(null)

        const {
            data: {user},
        } = await supabase.auth.getUser()

        if (!user) {
            setError('Not authenticated')
            setLoading(false)
            return
        }

        const slug = generateWeddingSlug(partnerOne, partnerTwo)

        const { error: updateError} = await supabase
            .from('weddings')
            .update({
                partner_one_name: partnerOne,
                partner_two_name: partnerTwo,
                wedding_date: weddingDate,
                header_text: headerText,
                welcome_message: welcomeMessage,
                slug,
                status: 'active',
            })
            .eq('id', weddingId)

        if (updateError) {
            setError(updateError.message)
            setLoading(false)
            return
        }


        router.push('/wedding-ready')
    }

    return (
        <PageBackground>
            <div className="w-full flex flex-col items-center">

                {/* Heading */}
                <h1
                    className="
          mt-[40px]
          font-inter
          font-medium
          text-[26px]
          tracking-[0.015em]
          text-[#3A3A3A]
          text-center
        "
                >
                    Create Your Wedding Page
                </h1>

                {/* Subtext */}
                <p
                    className="
          mt-[20px]
          font-inter
          font-normal
          text-[15px]
          leading-[150%]
          tracking-[0.015em]
          text-[#3A3A3A]
          text-center
          max-w-[320px]
        "
                >
                    Enter your details below to generate your personalised
                    wedding gifting page.
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
                            required
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
                            required
                            className="w-full rounded-[10px] bg-white px-[15px] py-[15px] border border-black/10 font-inter text-[15px] placeholder:text-[#3A3A3A]/35 focus:outline-none focus:ring-2 focus:ring-[#D8C9A6]/50"
                        />
                    </div>

                    {/* Wedding Date */}
                    <div>
                        <label className="block mb-[6px] font-inter font-medium text-[15px] text-[#3A3A3A]">
                            Wedding Date
                        </label>
                        <div className="relative">
                            <input
                                type="date"
                                placeholder="DD/MM/YYYY"
                                value={weddingDate}
                                onChange={(e) => setWeddingDate(e.target.value)}
                                required
                                className="w-full rounded-[10px] bg-white px-[15px] py-[15px] pr-[44px] border border-black/10 font-inter text-[15px] focus:outline-none focus:ring-2 focus:ring-[#D8C9A6]/50 appearance-none"
                            />

                        </div>
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

                    {error && (
                        <p className="text-[13px] text-red-600">
                            {error}
                        </p>
                    )}

                    <div className="mt-[16px]">

                        <div className="flex flex-col gap-[10px]">

                            {/* Subheading */}
                            <p
                                className="
                                font-inter
                                font-medium
                                text-[15px]
                                text-[#3A3A3A]
                              "
                            >
                                Your Collage Photo
                            </p>

                            {/* Helper text */}
                            <p
                                className="
                                font-inter
                                font-normal
                                text-[11px]
                                tracking-[0.015em]
                                text-[#3A3A3A]
                              "
                            >
                                Make your wedding page feel uniquely yours.
                            </p>

                            {/* Info link */}
                            <button
                                type="button"
                                onClick={() => setShowImageHelp(true)
                                }
                                className="
                                w-fit
                                font-inter
                                font-medium
                                text-[11px]
                                leading-[170%]
                                tracking-[0.015em]
                                text-[#C9A86A]
                                hover:opacity-80
                                underline
                                transition
                                hover:opacity-80
                                active:opacity-60
                              "
                            >
                                ⓘ What image should I upload?
                            </button>

                            <ImageRecommendationModal
                                open={showImageHelp}
                                onClose={() => setShowImageHelp(false)}
                            />


                        </div>
                    </div>

                    <div className="flex justify-center">
                        <PortraitUploadTile
                            uploadedUrl={collageImage?.publicUrl}
                            onUpload={uploadCollageImage}
                        />
                    </div>

                    {wedding.stripe_account_id ? (
                        <div className="mt-[16px] text-green-600 text-[14px] font-inter text-center">
                            ✓ Stripe account connected
                        </div>
                    ) : (
                        <ConnectBankAccountContainer
                            weddingId={weddingId}
                            connected={false}
                            beforeConnect={saveDraft}
                        />
                    )}

                    {!wedding.payout_enabled && (
                        <p className=" text-[12px] text-[#3A3A3A]/70 text-center">
                            Please finish Stripe setup so we can enable payouts before publishing your wedding page.
                        </p>
                    )}

                    <FinalStepChecklist
                        allFieldsCompleted={allFieldsCompleted}
                        collageUploaded={collageUploaded}
                        stripeConnected={stripeConnected}
                    />







                    {/* CTA */}
                    <button
                        onClick={handleCreate}
                        disabled={loading || !partnerOne || !partnerTwo || !weddingDate || !headerText || !welcomeMessage || !collageImage || !wedding.payout_enabled}

                        className="
                        shadow-[6px_4px_18px_rgba(0,0,0,0.1)]
                        rounded-[14px]
                        bg-[#D8C9A6]
                        py-[16px]
                        font-inter
                        font-medium
                        text-[16px]
                        text-white
                        transition
                        hover:opacity-90
                        active:opacity-80
                        active:scale-[0.98]
                        disabled:opacity-60
                        disabled:cursor-not-allowed
                      "
                    >
                        {loading ? 'Creating…' : 'Create My Wedding Page'}
                    </button>

                </div>
            </div>
        </PageBackground>
    )
}
