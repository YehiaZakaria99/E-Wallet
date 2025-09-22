import { PercentageOutlined, PieChartOutlined, SafetyOutlined } from '@ant-design/icons'
import React from 'react'

const chooseUsData = [
    {
        icon: <SafetyOutlined className='text-3xl' />,
        title: "Fast And Secure Transactions.",
        desc: "Enjoy secure and instant payments anywhere, anytime. CashEase gives you peace of mind."
    },
    {
        icon: <PercentageOutlined className='text-3xl' />,
        title: "Exclusive Promos and Discounts.",
        desc: "Exclusive app promos, discounts, cashback; save, feel benefits in your wallet."
    },
    {
        icon: <PieChartOutlined className='text-3xl' />,
        title: "Easy Financial Management.",
        desc: "Effortlessly manage finances, track expenses, set budgets, and invest with our e-wallet app."
    },
]

export default function ChooseUsSection() {
    return (
        <div id='chooseUs' className="bg-white">
            <div className="relative isolate px-4 sm:px-6 lg:px-8 ">
                <div className="mx-auto max-w-6xl md:py-10 py-32">
                    <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-blue-950">
                        <p>
                            Simple, Swift, and Secure,
                        </p>
                        <p>Why You Should Choose Us</p>
                    </h2>

                    {/* cards grid */}
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-16">
                        {chooseUsData.map(({ icon, desc, title }, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-xl p-6 flex flex-col items-center text-center h-full shadow-lg shadow-blue-950"
                            >
                                {/* icon */}
                                <div className="w-14 h-14 rounded-full text-blue-950 bg-secColor flex justify-center items-center mb-4">
                                    {icon}
                                </div>
                                {/* title */}
                                <h3 className="text-lg font-bold mb-2 text-blue-950">{title}</h3>
                                {/* desc */}
                                <p className="text-sm text-blue-950/70 ">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
