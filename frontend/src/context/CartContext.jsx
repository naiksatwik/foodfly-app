import axios from "axios";
import { createContext, useContext, useEffect, useReducer, useState } from "react";

import CartReducer from  '../Reducer/CartReducer'
import { useProductContext } from "./ProductContext";
const CartContext=createContext()

const getLocalCartData=()=>{
   let cartData=localStorage.getItem('CartItem');
   if(cartData === null){
     return []
   }else{
     return JSON.parse(cartData);
   }
}

const CartProvider=({children})=>{
    const {food}= useProductContext();
    const initialState={
        cart:getLocalCartData(),
        total_amount:""
    }
    const [state, dispatch] = useReducer(CartReducer, initialState);
    

    const removeProduct=(id)=>{
        dispatch({type:"REMOVE_ITEM",payload:id})
    }
    
    const incrementProduct=(id)=>{
        dispatch({type:"INCREMENT_CART",payload:id});
    }

    const decrementProduct=(id)=>{
        dispatch({type:"DECREMENT_CART",payload:id});
    }
    const addItem= async(id,price,image,pname,noItem)=>{
        dispatch({type:"ADD_TO_CART",payload:{id,price,image,pname,noItem}})
    }
    
    const totalCost=()=>{
        let total=0;
        state.cart.map((item)=>{
           total+=item.price;
        })

        return total;
    }

    const totalItem=()=>{
        let  totalItem=0;
        state.cart.map((item)=>{
            totalItem+=item.noItem;
        })

        return totalItem;
    }

    useEffect(()=>{
        localStorage.setItem('CartItem',JSON.stringify(state.cart))
    },[state.cart])

    return <CartContext.Provider value={{...state,addItem,removeProduct,incrementProduct,decrementProduct,totalCost,totalItem}}>{children}</CartContext.Provider>
}


const useCartContext=()=>{
    return useContext(CartContext)
}

export {CartProvider,useCartContext}