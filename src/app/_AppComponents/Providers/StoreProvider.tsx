'use client'
import { AppStore, store } from '@/lib/redux/store'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import Navbar from '../Navbar/Navbar'

type StoreProviderPropsType = {
    children: React.ReactNode
}

export default function StoreProvider({ children }: StoreProviderPropsType) {
    const storeRef = useRef<AppStore>(undefined)
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = store()
    }

    return (
        <>
            <Provider store={storeRef.current}>
                <Navbar />
                {children}
            </Provider>
        </>
    )
}