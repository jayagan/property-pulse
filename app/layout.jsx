import '@/assets/styles/globals.css'
import React from 'react'


export const metadata = {
    title: "Property Pulse | Find your perfect rental",
    description: "Find your dream rental property"
}

const MainLayout = ({children}) => {
  return (
    <html lan="en">
        <body>
        <div>{children}</div>
        </body>
    </html>
    
  )
}

export default MainLayout