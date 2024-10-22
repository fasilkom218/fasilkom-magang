import React from "react";
import pattern from "../../assets/img/pattern.png";

const ReasonSection = () => {
  return (
    <div>
      <h1 className="text-xl text-center font-bold md:text-2xl lg:text-3xl xl:text-4xl lg:tracking-tight">
        Why You Should <span className="lg:block">To Take an Internship?</span>
      </h1>
      <div className="grid grid-cols-2 gap-2 mt-5 sm:grid-cols-4 lg:gap-3 lg:mt-8">
        <div className="bg-slate-100 border-2 border-slate-300 shadow-sm lg:shadow-lg rounded-md shadow-slate-500 px-2 py-2 w-full sm:col-start-1 sm:row-start-1 sm:row-span-2 group cursor-pointer">
          <img src={pattern} alt="" className="rounded-md w-14 h-14" />
          <div className="">
            <h1 className="text-md font-bold mt-2 mb-1 md:text-lg lg:text-xl">Work Experience</h1>
            <p className="text-sm md:text-md lg:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste,
              consequatur.
            </p>
          </div>
        </div>
        <div className="bg-slate-100 border-2 border-slate-300 shadow-sm lg:shadow-lg rounded-md shadow-slate-500 px-2 py-2 w-full  sm:col-span-2 sm:col-start-2  sm:flex sm:gap-2 sm:items-center lg:gap-4">
          <img
            src={pattern}
            alt=""
            className="rounded-md w-14 h-14 sm:self-center lg:w-20 lg:h-20"
          />
          <div className=" ">
            <h1 className="text-md font-bold mt-2 mb-1 sm:mt-0 sm:mb-0 md:text-lg lg:text-xl">
              Work Experience
            </h1>
            <p className="text-sm md:text-md lg:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste,
              consequatur.
            </p>
          </div>
        </div>
        <div className="bg-slate-100 border-2 border-slate-300 shadow-sm lg:shadow-lg rounded-md shadow-slate-500 px-2 py-2 w-full  sm:col-span-2 sm:col-start-2  sm:flex sm:gap-2 sm:items-center lg:gap-4">
          <img
            src={pattern}
            alt=""
            className="rounded-md w-14 h-14 sm:self-center lg:w-20 lg:h-20"
          />
          <div className=" ">
            <h1 className="text-md font-bold mt-2 mb-1 sm:mt-0 sm:mb-0 md:text-lg lg:text-xl">
              Work Experience
            </h1>
            <p className="text-sm md:text-md lg:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste,
              consequatur.
            </p>
          </div>
        </div>
        <div className="bg-slate-100 border-2 border-slate-300 shadow-sm lg:shadow-lg rounded-md shadow-slate-500 px-2 py-2 w-full  sm:col-start-4 sm:row-start-1 sm:row-span-2">
          <img src={pattern} alt="" className="rounded-md w-14 h-14" />
          <div className="">
            <h1 className="text-md font-bold mt-2 mb-1 md:text-lg lg:text-xl">Work Experience</h1>
            <p className="text-sm md:text-md lg:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste,
              consequatur.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReasonSection;
