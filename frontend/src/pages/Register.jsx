import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";

const Form = () => {
  const Navig = useNavigate()
  const [UserType, setUserType] = useState(null);
  const [secretKey,setSecretKey]=useState(null);
  let mess = "enter";
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const onSubmit = (data) => {
if(UserType != null){
    if(UserType == 'Admin' && secretKey != "foodfly@admin" ){
         alert("Enter Secret Key...")
    }else{
      console.log(data);
      fetch("http://localhost:5000/api/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          address: data.address,
          phone: data.phone,
          UserType,
        }),
      })
        .then((res) => {
          res.json().then((info) => {
            console.log(info.error);
            if (info.error === "User Exists") {
              document.getElementById("track").innerHTML =
                "This Email is already registered";
            } else {
              window.localStorage.clear();
              window.localStorage.setItem("userName", data.name);
              window.localStorage.setItem("userEmail", data.email);
              window.localStorage.setItem("userAddress", data.address);
              window.localStorage.setItem("userPhone", data.phone);
              window.localStorage.setItem("UserType", UserType);
              if(UserType == 'Admin'){
                 Navig('/foodfly/user-type/admin')
              }else{
                Navig('/home')
              }
            }
          });
        })
        .then((ans) => {
          console.log(ans);
        });
    }
}else{
  alert("Select Admin Or User")
}
  };

  const schema = yup.object({
    name: yup.string().min(3).max(30).required("name field required.."),
    email: yup.string().email().required(),
    password: yup.string().min(4).max(20).required(),
    confirm_Password: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "confirm password must same as 'password'"
      )
      .required(),
    address: yup.string().min(7).required(),
    phone: yup
      .string()
      .required("required")
      .matches(phoneRegExp, "Phone number is not valid")
      .min(10, "too short")
      .max(10, "too long"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="mx-w-[100vh] max-auto">
      <div className="flex justify-between ">
        <img src={logo} alt="" className="w-[12rem] p-7" />
      </div>
      <div className="w-full h-[90vh] flex justify-center items-center  ">
        <form
          className=" flex flex-col px-6 py-6 rounded-2xl shadow-2xl shadow-purple-400 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-4xl text-center font-semibold">
            {UserType} Register
          </h1>

          <div className="w-full flex justify-start  p-2">
            <p>User Type:</p>
            <div className="px-2">
              <input
                type="radio"
                name="UserType"
                value="User"
                onChange={(e) => {
                  setUserType(e.target.value);
                }}
              />
              <span>User</span>
            </div>
            <div>
              <input
                type="radio"
                name="UserType"
                value="Admin"
                onChange={(e) => {
                  setUserType(e.target.value);
                }}
              />
              <span>Admin</span>
            </div>
          </div>
          <input
            type="text"
            placeholder="Your name"
            className={`border-2  py-2 px-10 rounded-full mt-2`}
            {...register("name")}
          />
          <p className="text-red-500 text-sm text-left pl-5 w-[25rem]">
            {errors.name?.message}
          </p>
          <input
            type="text"
            placeholder="Your Email"
            className="border-2 py-2 px-10 rounded-full mt-2"
            {...register("email")}
          />
          <p
            className="text-red-500 text-sm text-left pl-5 w-[25rem]"
            id="track"
          >
            {errors.email?.message}
          </p>
          <input
            type="password"
            placeholder="password"
            className="border-2 py-2 px-10 rounded-full mt-2"
            {...register("password")}
          />
          <p className="text-red-500 text-sm text-left pl-5 w-[25rem]">
            {errors.password?.message}
            {}
          </p>
          <input
            type="Password"
            placeholder="Confirm Password"
            className="border-2 py-2 px-10 rounded-full mt-2"
            {...register("confirm_Password")}
          />
          <p className="text-red-500 text-sm text-left pl-5 w-[25rem] ">
            {errors.confirm_Password?.message}
          </p>
          <input
            type="text"
            placeholder="Address"
            className="border-2 py-2 px-10 rounded-full mt-1"
            {...register("address")}
          />
          <p className="text-red-500 text-sm text-left pl-5 w-[25rem]">
            {errors.address?.message}
          </p>
          <input
            type="text"
            placeholder="phone number.."
            className="border-2 py-2 px-10 rounded-full mt-1"
            {...register("phone")}
          />
          <p className="text-red-500 text-sm text-left pl-5 w-[25rem]">
            {errors.phone?.message}
          </p>

          <div
            className={` ${
              UserType == "User" || UserType == null ? "hidden" : "block"
            }`}
          >
            <input
              type="text"
              placeholder="secret KEY."
              className={`border-2 py-2 px-10 rounded-full mt-1`}
              onChange={(e)=>{
                setSecretKey(e.target.value)
              }}
            />
          </div>

          <div className="w-full flex justify-between">
            <input
              type="submit"
              className="bg-purple-400 px-5 py-2 rounded-full mt-5"
            />

            <Link to="/">
              <button className="bg-purple-400 px-7 py-2 rounded-full mt-5">
                Back
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
