import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { MdAddShoppingCart } from "react-icons/md";
import CartItem from "../components/CartItem";
import { useCartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, totalCost, totalItem } = useCartContext();
  const[address,setAddress]=useState(null)
  let userName = window.localStorage.getItem("userName");
  let userEmail=localStorage.getItem('userEmail')
  let userAdd;
  let userPhone=localStorage.getItem('userPhone')
  if(address == null){
    userAdd=localStorage.getItem('userAddress')
  }else{
    userAdd=address;
  }
  const totalCosts = totalCost();
  const submit=async()=>{
    cart.push(totalCosts);
    let response= await fetch("http://localhost:5000/api/ProductToAdmin",{
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email:userEmail,
      order_data:cart,
      address:userAdd,
      userName,
      phone:userPhone,
      Time:new Date().toString().slice(0,25)
    }),
  }).then(res=>{
    console.log("cart Page",res)
    if(res.status === 200){
  console.log(cart)

    localStorage.removeItem('CartItem');

    location.reload()
  }
  }) 
  }
  return (
    <div>
      <Navbar />
      <div>
        {cart.map((product) => {
          return <CartItem data={product} />;
        })}

        {cart.length > 0 ? (
          <div className="max-w-[600px] mx-auto flex flex-col items-end pr-8 ">
            <input
              type="text"
              placeholder="Add address"
              className="border-2 border-black p-1 rounded-full mt-10 pl-6"
              onChange={(eve)=>{
                setAddress(eve.target.value)

              }}
            />
             
            <h1 className=" text-2xl font-bold  px-10 pt-4 ">
              Total: ₹{totalCosts}
            </h1>
            {userName == null ? (
              <Link to="/sigin">
                <button className="mt-4 bg-black text-white px-4 py-2 rounded-full mr-10" >
                  Login for Order
                </button>
              </Link>
            ) : (
                <button className="mt-4 bg-black text-white px-4 py-2 rounded-full mr-10" onClick={()=>{
                submit()
                }  } type="submit">
                  place Order
                </button>
            )}
          </div>
        ) : (
          <div className="flex h-[80vh] w-full items-center justify-center space-x-4">
            <h1 className="text-4xl  text-center ">Cart is Empty</h1>
            <MdAddShoppingCart size={50} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
