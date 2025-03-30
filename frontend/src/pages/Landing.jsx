import React from "react";
import logo from  '../assets/FoodFly_logo.png';
import {Link} from 'react-router-dom'
const Landing = () => {
  return (
    <div className="w-full  h-[100vh]">
      <div className="flex w-full h-full justify-evenly">
      <div className="md:w-[60%] ">
          <div className="navbar   flex items-center justify-between px-4 ">
            <div className="">
            <img src={logo} alt=""  className="w-[9rem] "/>
            </div>
            <div className="space-x-8">
               <Link to='/register'>
               <button className="bg-white px-4 py-2 font-medium rounded-full shadow-md ">Register</button>
               </Link> 
               <Link to='/sigin'>
               <button className="blackBtn">Login</button>
               </Link>
            </div>
          </div>

          <div className="px-10">
                <h1 className="text-7xl font-medium pt-10">Hungry?</h1>
                <h3 className="text-[#555353] text-xl pt-[2rem]">Order food from favourite restaurants near you</h3>
                <p className="text-[13px] text-[#979090] pt-[2rem]">POPULAR FOODS IN INDIA</p>
                <p className="text-md pt-[1rem]">Butter chicken, Chicken Roll Burger, Fried Chicken, Pizza, Sandavich, Egg Grill</p>
            </div>
      </div>




        <div className="md:w-[40%] hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1612240498936-65f5101365d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        
      </div>
    </div>
  );
};

export default Landing;
