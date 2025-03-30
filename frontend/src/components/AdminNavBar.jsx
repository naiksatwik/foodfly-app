import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";
import { GrAdd ,GrUserAdmin } from "react-icons/gr";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";

const AdminNavBar = () => {
  const [toggle, setToggle] = useState(false);
  const [NavToggle, setNevToggle] = useState(false);
  const { totalItem } = useCartContext();
  const totalItems = totalItem();
  let userName = window.localStorage.getItem("userName");
  let userType = window.localStorage.getItem("UserType");
  const logOut = () => {
    localStorage.clear();
    location.reload();
  };
  return (
    <div className="max-w-[1240px] mx-auto px-4 py-4 sticky top-0 bg-white z-40">
      <div className="w-full px-4 flex justify-between text items-center relative">
        <div className="flex pr-3 items-center">
          
          <Link to="/home">
            <img src={logo} alt="" className="w-[7rem] " />
          </Link>
        </div>
        <div className="hidden md:block">
          <div className=" flex md:items-center space-x-2">
            {(userName === null || userType == 'User' )? (
              <FaUserPlus size={25} className=" text-red-500" />
            ) : (
              <GrUserAdmin size={25} className=" text-green-500" />
            )}
            <div className="text-xl font-semibold">
              {(userName === null || userType == 'User' )? (
                <h1>Admin not Found</h1>
              ) : (
                <h1>Hi, {userName}</h1>
              )}
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <div className="flex text-sm space-x-6  pr-4">
            {userName === null  ? (
              <button
                className=" text-black font-medium px-5 py-2 shadow-md rounded-full space-x-4 "
                onClick={() => {
                  location.href = "http://localhost:5173/sigin";
                }}
              >
                {/* {userName === null ? <p>login</p> : <p>Logout</p>} */}
                Login
              </button>
            ) : (
              <button
                className=" text-black font-medium px-5 py-2 shadow-md rounded-full space-x-4 "
                onClick={() => {
                  logOut();
                }}
              >
                {/* {userName === null ? <p>login</p> : <p>Logout</p>} */}
                Logout
              </button>
            )}
            <Link to="/foodfly/user-type/admin">
            <button className="blackBtn w-[6rem] text-sm">
              <div className=" ">
                DashBoard
              </div>
            </button>
          </Link>

            <Link to="/addProduct">
              <button className="blackBtn w-[6rem] text-sm">
                <div className="flex items-center space-x-3 ">
                  <AiOutlinePlus size={20} className="mr-2" /> FOOD
                </div>
              </button>
            </Link>
 
            <Link to="/foodfly/DelItem">
            <button className="blackBtn w-[6rem] text-sm">
              <div className=" ">
                DelFood
              </div>
            </button>
          </Link>
          </div>
        </div>
        <div
          className={`duration-1000 absolute top-[3rem]  backdrop-blur-md h-screen w-full flex flex-col items-center space-y-14 ${
            toggle ? "left-0" : "left-[-300%]"
          } md:left-[-300%] md:hidden z-50`}
        >
          <div className=" flex items-center space-x-2 mt-10 justify-start">
            <div className=" flex md:items-center space-x-2">
              {userName === null ? (
                <FaUserPlus size={25} className=" text-red-500" />
              ) : (
                <GrUserAdmin size={25} className=" text-green-500" />
              )}
              <div className="text-xl font-semibold">
                {userName === null ? (
                  <h1>Admin not Found</h1>
                ) : (
                  <h1>Hi, {userName}</h1>
                )}
              </div>
            </div>
          </div>

          {userName === null ? (
            <button
              className=" text-black font-medium px-5 py-2 shadow-md rounded-full space-x-4 "
              onClick={() => {
                location.href = "http://localhost:5173/sigin";
              }}
            >
              {/* {userName === null ? <p>login</p> : <p>Logout</p>} */}
              Login
            </button>
          ) : (
            <button
              className=" text-black font-medium px-5 py-2 shadow-md rounded-full space-x-4 "
              onClick={() => {
                logOut();
              }}
            >
              {/* {userName === null ? <p>login</p> : <p>Logout</p>} */}
              Logout
            </button>
          )}
          <Link to="/foodfly/user-type/admin">
          <button className="blackBtn w-[6rem] text-sm">
            <div className=" ">
              DashBoard
            </div>
          </button>
        </Link>
          <Link to="/addProduct">
              <button className="blackBtn w-[7rem] text-sm">
                <div className="flex items-center space-x-3 ">
                  <AiOutlinePlus size={20} className="mr-2" /> FOOD
                </div>
              </button>
            </Link>

            <Link to="/foodfly/DelItem">
            <button className="blackBtn w-[6rem] text-sm">
              <div className=" ">
                DelFood
              </div>
            </button>
          </Link>
        </div>
        {toggle ? (
          <AiOutlineClose
            onClick={() => {
              setToggle(!toggle);
            }}
            size={30}
            className="md:hidden"
          />
        ) : (
          <AiOutlineMenu
            onClick={() => {
              setToggle(!toggle);
            }}
            size={30}
            className="md:hidden"
          />
        )}
      </div>
    </div>
  );
};

export default AdminNavBar;
