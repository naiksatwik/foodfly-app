import React from "react";
import { AiOutlineUser, AiOutlineMail, AiOutlineUsergroupAdd } from "react-icons/ai";


import Navbar from "../components/Navbar";

const Profile = () => {
  let userName = localStorage.getItem("userName");
  let userEmail = localStorage.getItem("userEmail");
  let userAddress = localStorage.getItem("userAddress");
  let userPhone = localStorage.getItem("userPhone");
  return (
    <>
      <Navbar />

      {
        (userName === null)?<h1 className="text-4xl font-medium w-full h-[80vh] flex items-center justify-center">User Not Found <AiOutlineUsergroupAdd size={40} className="ml-2 text-red-600"/></h1>:
        <div className="w-full h-[90vh] flex items-center justify-center ">
        <div className="w-[20rem]  p-2 rounded-xl hover:scale-110 duration-200 shadow-xl">
          <div className="w-full flex justify-center">
            <AiOutlineUser size={60}className="text-green-500" />
          </div>
          <div className=" px-10 py-2">
            <div className="space-y-2 ">
              <p className="text-xl font-semibold text-gray-400">Name</p>
              <p className="pl-10  text-lg font-medium"> {userName}</p>
            </div>
            <div className="space-y-2">
            <p className="text-xl font-semibold flex items-center  text-gray-400">email <AiOutlineMail className="ml-2"/></p>
              <p className="pl-10  text-lg font-medium"> {userEmail}</p>
             
            </div>
            <div className="space-y-2">
            <p className="text-xl font-semibold flex items-center  text-gray-400">Address </p>
              <p className="pl-10  text-lg font-medium">{userAddress}</p>
            </div>
            <div className=" space-y-2">
            <p className="text-xl font-semibold flex items-center  text-gray-400">Phone number </p>
              <p className="pl-10  text-lg font-medium">{userPhone}</p>
            </div>
          </div>
        </div>
      </div>

      }
     
    </>
  );
};

export default Profile;
