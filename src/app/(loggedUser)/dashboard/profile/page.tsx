import Logout from '@/app/_AppComponents/Auth/Logout'
import React from 'react'

export default function ProfilePage() {
  return (
    <>
     <section className='h-screen bg-stone-800 text-white'>
                {/* Logout */}
        <div className="px-4 mt-6">
          <Logout />
          </div>    
    </section> 
    </>
  )
}
