import React from "react";
import banner from "../assets/Banner.jpg";
import food1 from "../assets/chickenRoll.jpg";
import food2 from "../assets/Burger.jpg";
import food3 from "../assets/butterChicken.jpg";

const HeroSec = () => {

  return (
    <div className="max-w-[1240px] mx-auto  px-4 -z-50 ">
      <div className="max-h-[500px] relative px-4">
        <div>
          <img
            src={banner}
            alt=""
            className="brightness-50 rounded-xl w-full h-full object-cover -z-50  md:h-[400px] "
          />
        </div>
        <div className="absolute top-0 w-full h-full  flex flex-col justify-center px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            The<span className="text-[#FB8700]"> Best</span>
          </h1>
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            <span className="text-[#FB8700]">Foods </span>Delivered
          </h1>
        </div>
      </div>

      <div className="py-10 px-4  grid grid-flow-row sm:grid-cols-2 md:grid-cols-3 gap-10 ">
        <div className="relative">
          <img src={food1} alt="" className="brightness-50 rounded-xl w-full h-[12rem] object-cover" />
          <div className="absolute top-0  font-semibold px-8 py-5 flex w-full h-full items-center justify-center">
            <h1 className="text-2xl text-white">Chicken Rool</h1>
          </div>
        </div>
        <div className="relative">
          <img src={food2} alt="" className="brightness-50 rounded-xl w-full h-[12rem] object-cover " />
          <div className="absolute top-0  font-semibold px-8 py-5 flex w-full h-full items-center justify-center ">
            <h1 className="text-2xl text-white">Burger</h1>
          </div>
        </div>

        <div className="relative">
          <img src={food3} alt="" className="brightness-50 rounded-xl object-center w-full h-[12rem]" />
          <div className="absolute top-0  font-semibold px-8 py-5 flex w-full h-full items-center justify-center">
            <h1 className="text-2xl text-white">Butter Chicken</h1>
          </div>
        </div>
      </div>


    </div>
  );
};

export default HeroSec;
