export default function PageBackground({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen pt-[20px] md:pt-[30px] bg-gradient-to-b from-[#EDE0C3] via-[#F6EEDC] to-[#FFFEFA]">
            {children}
        </div>
    )
}
