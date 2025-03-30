import React, { useEffect, useState } from "react";
import AdminNavBar from "../components/AdminNavBar";
import { useProductContext } from "../context/ProductContext";

const AddProduct = () => {
  const UserType=localStorage.getItem("UserType")
  const [name, setName] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [price, setPrice] = useState(null);
  const [category, setCategory] = useState(null);
  const {food}=useProductContext();
  const  ProObj=food[food.length-1];
  const ProductId=ProObj.id+1;
  function run() {
    fetch("http://localhost:5000/api/addProduct", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        id:ProductId,
        name,
        category,
        image: imageUrl,
        price,
        noItem: 0,
      }),
    }).then((res) => {
      console.log(res.json());
      setName("");
      setImageUrl("");
      setPrice("");
    });
  }

  return (
    <>
      <AdminNavBar />
{
  (UserType == null || UserType == 'User')?<div className='text-3xl font-semibold text-red-500 h-[80vh] flex justify-center items-center'>Not Login as Admin</div>:
  <div className="w-full h-[82vh] ">
  <h1 className=" text-4xl  font-bold text-center pt-10 ">
    Add new Product
  </h1>

  <div className="w-[20rem] mx-auto  p-7 rounded-md shadow-xl mt-10">
    <div className="mt-2">
      <p className="pb-1">Product Name</p>
      <input
        type="text"
        placeholder="Product name"
        className="pl-2 px-10 border-2  rounded-lg"
        value={name}
        onChange={(eve) => {
          setName(eve.target.value);
        }}
      />
    </div>

    <div className="mt-2">
      <p className="pb-1">Image URL</p>
      <input
        type="url"
        placeholder="Enter Image URL.."
        className="pl-2 px-10 border-2  rounded-lg"
        value={imageUrl}
        onChange={(eve) => {
          setImageUrl(eve.target.value);
        }}
      />
    </div>

    <div className="mt-2">
      <p className="pb-1">Select Category</p>

      <select
        onChange={(eve) => {
          setCategory(eve.target.value);
        }}
        className="px-10 border-2 rounded-lg "
      >
        <option value="salad"> salad</option>
        <option value="pizza"> pizza</option>
        <option value="burger">burger</option>
        <option value="chicken">chicken</option>
      </select>
    </div>

    <div className="mt-2">
      <p className="pb-1">Price</p>₹{" "}
      <input
        type="number"
        placeholder="Enter Product Price"
        className="pl-2  border-2  rounded-lg"
        value={price}
        onChange={(eve) => {
          setPrice(Number(eve.target.value));
        }}
      />
    </div>

    <input
      type="submit"
      className="bg-black text-white px-6 py-2 rounded-full mt-4"
      onClick={() => {
        
        run();
      }}
    />
  </div>

</div>
}
    </>
  );
};

export default AddProduct;
