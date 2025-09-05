import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
    const navigate=useNavigate();
  return (
    <div className='h-screen justify-center flex items-center'>
        <div className='h-50 w-40 flex items-center flex-col justify-center border-1'>
      <p>No Page Found!</p>
      <button className='border-1 cursor-pointer bg- mt-8 rounded-md p-1' onClick={()=>navigate("/")}>Home</button>
      </div>
    </div>
  )
}

export default ErrorPage
