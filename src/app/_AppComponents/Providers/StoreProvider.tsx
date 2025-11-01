'use client'
import { AppStore, store } from '@/lib/redux/store'
import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import Navbar from '../Navbar/Navbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type StoreProviderPropsType = {
    children: React.ReactNode
}

// Create a client
const queryClient = new QueryClient();

export default function StoreProvider({ children }: StoreProviderPropsType) {

    const storeRef = useRef<AppStore>(undefined)
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = store()
    }



    return (
        <>
            <Provider store={storeRef.current}>
                <QueryClientProvider client={queryClient}>
                    <Navbar />
                    {children}
                </QueryClientProvider>
            </Provider>
        </>
    )
}