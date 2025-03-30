import React, { useState } from "react";

import FoodCards from "./FoodCards";

import { useProductContext } from "../context/ProductContext";
const Foods = (props) => {
    const {food} =useProductContext()
    const [filterType,setFilterType]=useState(null)
    const [filterPrice,setFilterPrice]=useState(Number.MAX_VALUE)
    console.log(food)
  return (
    <div className="max-w-[1240px] mx-auto px-4 py-7">
      <h1 className="text-[#FB8700] text-2xl font-bold text-center">
        Top Rated Menu Items
      </h1>
       <div className="row  px-4 flex flex-col md:flex-row md:justify-between   ">

       <div >
        <p className="font-semibold py-2">Filter Type</p>
        <div className="text-[1rem] space-x-2 flex justify-between">
        <button className={`font-normal ${filterType === null ? " orangeButton bg-[#FB8700] text-white " : "orangeButton"}`} onClick={()=>{
         setFilterType(null)
        }}>All</button>
        <button className={`font-normal ${filterType === 'burger' ? "orangeButton bg-[#FB8700] text-white " : "orangeButton"}`}   onClick={()=>{
         setFilterType('burger')
        }}>Burger</button>
        <button className={`font-normal ${filterType === 'pizza' ? "orangeButton bg-[#FB8700] text-white " : "orangeButton"}`} onClick={()=>{
         setFilterType('pizza')
        }}>Pizza</button>
        <button className={`font-normal ${filterType === 'salad' ? "orangeButton bg-[#FB8700] text-white " : "orangeButton"}`} onClick={()=>{
         setFilterType('salad')

        }}>Salad</button>
        <button className={`font-normal ${filterType === 'chicken' ? "orangeButton bg-[#FB8700] text-white " : "orangeButton"}`} onClick={()=>{
         setFilterType('chicken')
        }}>Chicken</button>
        </div>
       </div>
       
       <div >
        <p className="font-semibold py-2 md:text-right px-1">Filter Price</p>
        <div className="text-[1rem] space-x-2 flex justify-between" >
        
        <button className={`font-normal ${filterPrice === 100 ? "orangeButton bg-[#FB8700] text-white " : "orangeButton"}`} onClick={()=>{
         setFilterPrice(100)
        }}>₹100</button>
        <button className={`font-normal ${filterPrice === 500 ? "orangeButton bg-[#FB8700] text-white " : "orangeButton"}`} onClick={()=>{
         setFilterPrice(500)
        }}>₹500</button>
        <button className={`font-normal ${filterPrice === 1000 ? "orangeButton bg-[#FB8700] text-white " : "orangeButton"}`} onClick={()=>{
         setFilterPrice(1000)
        }}>₹1000</button>
        <button className={`font-normal ${filterPrice === 2000 ? "orangeButton bg-[#FB8700] text-white " : "orangeButton"}`}  onClick={()=>{
         setFilterPrice(2000)
        }}>₹2000</button>
        </div>
       </div>
       </div>

       {/* DIsplay food */}
       
       <div className="px-4 py-10 grid grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center  ">
         {
            food.map((item)=>{
              if((item.category === filterType && item.price <= filterPrice)|| (filterType === null && item.price <= filterPrice)  ){
                return   <FoodCards name={item.name} price={item.price} image={item.image} id={item.id} Add={props.Add} count={props.count} noItem={item.noItem} />
              }

            })
         }
       </div>
    </div>
  );
};

export default Foods;
