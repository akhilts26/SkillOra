import React from 'react'
import Navbar from '../components/Navbar'

const ErrorPage = () => {
  return (
    <div className='h-[100vh] flex text-center'>
        <Navbar/>
        <p className='m-auto text-[300px] font-bold  text-base/6'>404<br/><span className='text-[20px]'>Page Not Found</span></p>
    </div>
  )
}

export default ErrorPage