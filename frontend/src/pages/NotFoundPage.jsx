import React from 'react'
import { Link } from "react-router-dom"

function NotFoundPage() {
  return (
    <div className='flex flex-col items-center justify-center gap-2 w-full h-screen font-extrabold text-5xl  dark:bg-green-500 dark:text-white'>404 NOT FOUND
        <Link to="/">Home</Link>
    </div>
  )
}

export default NotFoundPage