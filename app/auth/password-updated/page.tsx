import PageBackground from '@/components/PageBackground'

export default function PasswordUpdatedPage() {
    return (
        <PageBackground>

            <main>
                <div className="w-full max-w-sm flex flex-col items-center text-center">

                    {/* Heading */}
                    <h1
                        className="
                          mt-[40px]
                          font-inter
                          font-medium
                          text-[26px]
                          tracking-[0.015em]
                          text-[#3A3A3A]
                        "
                    >
                        Your password has<br />been reset
                    </h1>

                    {/* Checkmark icon */}
                    <img
                        src="/checkmark-icon.svg"
                        alt=""
                        className="mt-[24px]"
                    />

                    {/* Message */}
                    <p
                        className="
                          mt-[24px]
                          font-inter
                          font-normal
                          text-[15px]
                          leading-[150%]
                          tracking-[0.015em]
                          text-[#3A3A3A]
                        "
                    >
                        You can now log in using<br />
                        your new password.
                    </p>

                    {/* CTA button */}
                    <a
                        href="/auth/login"
                        className="
                          shadow-[6px_4px_18px_rgba(0,0,0,0.1)]
                          mt-[40px]
                          inline-flex
                          items-center
                          justify-center
                          rounded-[14px]
                          bg-[#D8C9A6]
                          px-[62px]
                          py-[16px]
                          font-inter
                          font-medium
                          text-[16px]
                          text-white
                          transition
                          hover:opacity-90
                          active:opacity-80
                          active:scale-[0.98]
                        "
                    >
                        Log In
                    </a>

                    {/* Return to homepage */}
                    <a
                        href="/"
                        className="
                          mt-[24px]
                          font-inter
                          font-medium
                          text-[15px]
                          leading-[170%]
                          tracking-[0.015em]
                          text-[#C9A86A]
                          underline
                          underline-offset-2
                          hover:opacity-80
                          transition
                          hover:opacity-80
                          active:opacity-60
                        "
                    >
                        Return to Homepage
                    </a>

                </div>
            </main>
        </PageBackground>
    )
}
