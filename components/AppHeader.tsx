import Link from 'next/link'
import Image from 'next/image'
import ProfileMenu from '@/components/ProfileMenu'

type AppHeaderProps = {
    tagline?: string
    showProfile?: boolean
}

export default function AppHeader({ tagline, showProfile = true,}: AppHeaderProps) {
    return (
        <header className="w-full">
            <div className="mx-auto max-w-[1200px] flex items-center justify-between">

                {/* Left: Logo + Brand */}
                <Link
                    href="/"
                    className="flex items-center gap-[6.5px]"
                >
                    <img className="evergift_icon"
                         src="/evergift-logo.svg"
                         alt="EverGift logo"
                    />

                    <span className="playfair-display-header_text text-[36px] text-[#7a7a7a] whitespace-nowrap">
                      {tagline?? 'EverGift'}
                        <span className="hidden [@media(min-width:900px)]:inline">
                        </span>
                    </span>

                </Link>

                {/* Right: Profile */}
                {showProfile && <ProfileMenu/>}
            </div>
        </header>
    )
}
