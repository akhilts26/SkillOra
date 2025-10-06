import React from 'react'
import profiel_picture from "../assets/images/profile image.jpg";

const Temp = () => {
  return (
    <div className='w-[300px] h-[200px] border overflow-hidden'>
        <img src={profiel_picture} alt="" className=' w-full h-full object-cover hover:scale-125'  />
    </div>
  )
}

export default Temp