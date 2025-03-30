import React from "react";

import { AiFillDelete } from "react-icons/ai";
import { useCartContext } from "../context/CartContext";

const CartItem = (props) => {
  const { id, pname, image, price ,noItem} = props.data;

   const {removeProduct,incrementProduct,decrementProduct}=useCartContext();
  return (
    <div className="w-[20rem] mt-5  mx-auto shadow-2xl flex md:justify-between rounded-lg p-3 flex-col items-center md:flex-row md:w-[40rem] hover:transition hover:scale-110">
      <img
        src={image}
        alt={pname}
        className="w-[10rem] h-[8rem] object-cover"
      />
      <div className="space-y-5 md:pr-10 flex flex-col items-center mt-4 ">
        <p className="text-xl font-bold text-gray-500">{pname}</p>
        <p className="text-lg font-semibold">₹{price}</p>
        <div className="flex space-x-4 ">
          <button
            className="bg-black text-white px-5  text-2xl
         rounded-full pb-2"
          onClick={()=>incrementProduct(id)}>
            +
          </button>
          <p className="text-2xl">{noItem}</p>
          <button className="bg-black text-white px-5  text-2xl rounded-full pb-1"  onClick={()=>{decrementProduct(id)
            if(noItem == 1) removeProduct(id);
          }}>
            -
          </button>
        </div> 
      </div>
      <div>
        <AiFillDelete size={30}  className="text-red-500 md:mr-8 mt-4 cursor-pointer" onClick={()=>removeProduct(id)}/>
      </div>
    </div>
  );
};

export default CartItem;
