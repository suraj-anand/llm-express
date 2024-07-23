import { FaCopyright } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";

const Footer = () => {
  return (
    <div className='container-fluid text-white bg-gray-700 text-center p-20'>
            <div className="flex-item mx-auto">
                <p className='text-xl font-extrabold'>LLM Express</p>
            </div>
            
            {/* Copyright */}
            <div className="flex align-middle justify-center my-3">
                <div className="flex gap-0.5  my-auto">
                    <span className='font-medium'>
                        Copyright 
                    </span>
                    <FaCopyright /> 
                    <span className="mx-1 fw-bolder">{new Date().getFullYear()}</span>
                </div>
            </div>
            <p className="">All rights reserved</p>

            {/*  */}
            <div className="flex gap-2 align-middle justify-center mt-5">
                <p className="">Made with</p>
                <IoMdHeart className="text-red-500" />
                <p>By ~ Suraj</p>
            </div>
    </div>
  )
}

export default Footer