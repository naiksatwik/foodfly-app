import React from "react";
import { useCartContext } from "../context/CartContext";

const FoodCards = (props) => {
  const { addItem } = useCartContext();
  const ut=localStorage.getItem('UserType');
  const Price=Number(props.price);
  return (
    <div className="shadow-2xl rounded-lg hover:scale-110 duration-200 w-[17rem] sm:w-full">
      <img
        src={props.image}
        alt={props.name}
        className="  w-full  h-[8rem] object-cover  rounded-tl-lg rounded-tr-lg"
      />
      {
       (ut == "User"|| ut =='user' || ut == null)?
       <div className="flex py-2 px-3 justify-between">
       <div className="w-1/2">
         <p className="text-[12px] text-gray-500 font-medium">{props.name}</p>
         <p className="text-sm font-medium pt-2">₹{props.price}</p>
       </div>
       <div className="w-1/3 flex items-center justify-center">
         <button
           className="orangeButton px-4 text-sm hover:bg-green-600  hover:text-white  hover:border-green-600"
           onClick={() =>
             addItem(
               props.id,
               Price,
               props.image,
               props.name,
               props.noItem
             )
           }
         >
           Add{" "}
         </button>
       </div>
     </div>:
     <div className="flex py-2 px-3 justify-between">
     <div className="w-1/2">
       <p className="text-[12px] text-gray-500 font-medium">{props.name}</p>
       <p className="text-sm font-medium pt-1">₹{props.price}</p>
       <p className="text-sm font-medium pt-2"><span className="text-md text-gray-500 font-medium">Id </span>{props.id}</p>
     </div>
     <div className="w-1/3 flex items-center justify-center">
       <button
       id="but"
         className="orangeButton px-4 text-sm hover:bg-green-600  hover:text-white  hover:border-green-600"
         onClick={() =>
           addItem(
             props.id,
             Price,
             props.image,
             props.name,
             props.noItem
           )
         }
       >
         Add{" "}
       </button>
     </div>
   </div>
      }

    </div>
  );
};

export default FoodCards;
