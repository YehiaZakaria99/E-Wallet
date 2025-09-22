import React from 'react'
import Link from 'next/link'

export default function HeroSection() {
    return (
        <section className="bg-blue-950 min-h-screen flex items-center relative">
            <div className="relative  w-full px-4 sm:px-6 lg:px-8 py-20 md:py-40">
                <div className="max-w-3xl mx-auto text-center py-10">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                        Managing Your Personal Finances Made Easier
                    </h1>
                    <p className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg font-light text-white">
                        Elevate your financial experience with E-Wallet. We simplify how you pay,
                        transfer money, and manage your finances, giving you full control over your money.
                    </p>
                </div>

                <div className="mt-0 flex items-center justify-center gap-x-6 py-5 z-[99] relative">
                    <Link href="/signup" className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-blue-950 shadow-xs hover:bg-gray-100 ">
                        Get started
                    </Link>
                    <Link href="#chooseUs" className="text-sm/6 font-semibold text-white hover:text-gray-100">
                        Learn more
                    </Link>
                </div>

                {/* background shape */}
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl 
                               sm:top-[calc(100%-30rem)] lg:top-[calc(100%-40rem)]"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-1/2 aspect-[1155/678] w-[36rem] -translate-x-1/2 
                                   bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 
                                   sm:w-[48rem] lg:w-[72rem]"
                    />
                </div>

            </div>
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200">
                    <path fill="#fff" fill-opacity="1" d="M0,128L80,138.7C160,149,320,171,480,160C640,149,800,107,960,85.3C1120,64,1280,64,1360,64L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                </svg>
            </div>
        </section>
    )
}
