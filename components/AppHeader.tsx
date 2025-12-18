import Link from 'next/link'
import Image from 'next/image'
import ProfileMenu from '@/components/ProfileMenu'

export default function AppHeader() {
    return (
        <header className="w-full">
            <div className="mx-auto max-w-[1200px] flex items-center justify-between px-6">

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
                      EverGift
                        <span className="hidden [@media(min-width:900px)]:inline">
                          · A Simpler Way To Share The Love
                        </span>
                    </span>

                </Link>

                {/* Right: Profile */}
                <ProfileMenu/>
            </div>
        </header>
    )
}
