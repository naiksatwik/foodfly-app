import React from 'react'
import logo from '../assets/logo.png'
import {AiFillFacebook,AiFillInstagram,AiFillYoutube} from 'react-icons/ai'
const Footer = () => {
  return (
    <div className='max-w-[1235px] mx-auto px-4  h-[12rem] py-4  border-t-2 border-[#A8A8A8] flex justify-between'>
       <div className='w-1/3 h-full hidden md:block'>
       <div className='px-4 h-full w-full flex flex-col justify-between '>
          <img src={logo} alt='' className='w-[8rem]'/>
           <div className='flex space-x-3 items-center'>
            <AiFillFacebook size={30}/>
            <AiFillInstagram size={30}/>
            <AiFillYoutube size={34}/>
           </div>
        </div>
       </div>
        <div className=' h-full w-full md:w-1/2   font-medium p-4 md:p-0'>
            <div className='list-none text-[15px] flex space-x-4 text-center md:text-left  pb-10 flex-col md:flex-row'>
            <li>Privacy Policy</li>  
            <li>Terms</li>
            <li>Pricing</li>
            <li>Do not sell or share my personal information</li>
            </div>

            <div className='text-[15px] text-center md:text-left'>
            <p className='pb-5'>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
            <p> © 2023 Food Fly Technologies Inc.</p>
            </div>
        </div>
    </div>
  )
}

export default Footer