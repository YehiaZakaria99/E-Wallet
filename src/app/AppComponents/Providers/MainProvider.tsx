
import React from 'react'
import StoreProvider from './StoreProvider'

type MainProviderPropsType = {
  children: React.ReactNode
}

export default function MainProvider({ children }: MainProviderPropsType) {
  return (
    <>
      <StoreProvider>
        {children}
      </StoreProvider>
    </>
  )
}
