import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
const ProductCon=createContext()

const ProductContext = ({children}) => {

    const[food,setFoods]=useState([]);
    const[orders,setOrders]=useState([]);

    useEffect(() => {
      const  getProduct= async()=>{
        return await axios.get('http://localhost:5000/api/products').then((res)=>{
         setFoods(res.data.data)
        })
    }
      getProduct();

    }, [])

useEffect(() => {
  const  getOrders= async()=>{
    return await axios.get('http://localhost:5000/api/ProductToAdmin').then((res)=>{
     setOrders(res.data.data)
    })
  }
  getOrders();

}, [])

    return   <ProductCon.Provider value={{food,orders}} >
    {children}
    </ProductCon.Provider>
}



const useProductContext=()=>{
    return useContext(ProductCon)
}


export { ProductContext,useProductContext}