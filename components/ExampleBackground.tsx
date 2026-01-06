import AppHeader from '@/components/AppHeader'
import Footer from "@/components/Footer";
import ScrollToTopFloating from "@/components/ScrollToTopFloating";

export default function ExampleBackground({
                                              children,
                                          }: {
    children: React.ReactNode
}) {
    return (
        <div
            className="min-h-screen px-[24px] py-[20px] bg-gradient-to-b from-[#EDE0C3] via-[#F6EEDC] to-[#FFFEFA]"
        >
            {/* Custom header text for example pages */}
            <AppHeader tagline="A celebration of love" showProfile={true}/>

            {children}
            <ScrollToTopFloating/>
            <Footer/>
        </div>
    )
}
