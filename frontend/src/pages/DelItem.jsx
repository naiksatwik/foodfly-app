import React, { useState } from "react";
import { number } from "yup";
import AdminNavBar from "../components/AdminNavBar";
import FoodCards from "../components/FoodCards";
import { useProductContext } from "../context/ProductContext";

const DelItem = () => {
  const UserType=localStorage.getItem("UserType")
  const [id, setId] = useState(null);
  const {food} = useProductContext()
  const delProductById = () => {
    fetch("http://localhost:5000/api/delProduct", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          id,
        }),
      }).then((res) => {        
        setId(0)
        location.reload();
      });
  };
  return (
    <>
      <AdminNavBar />

      {
        (UserType == null || UserType == 'User')?<div className='text-3xl font-semibold text-red-500 h-[80vh] flex justify-center items-center'>Not Login as Admin</div>:
        <div className="max-w-[1240px] mx-auto">
        <h1 className="font-medium text-center text-4xl py-5">
          Delete Product{" "}
        </h1>
        <div className="flex items-center justify-center flex-col md:flex-row">
          <input
            placeholder="Enter Id.."
            type="number"
            value={id}
            onChange={(ev) => {
              setId(ev.target.value);
            }}
            className="px-3 py-1 m-1 rounded-md border-2 border-black"
          />
          <button className="bg-black text-white px-6 py-1 rounded-full mt-2 md:mt-0 " onClick={()=>{

            delProductById()
          }}>
            Delete
          </button>
        </div>

        <div className="px-4 py-10 grid grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center  ">
        {
           food.map((item)=>{
               return   <FoodCards name={item.name} price={item.price} image={item.image} id={item.id} noItem={item.noItem} />
           })
        }
      </div>
      </div>
      }
    </>
  );
};

export default DelItem;
