import React, { useEffect } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { FaMoneyCheck } from "react-icons/fa";
import { PiBagFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { foramterDate } from "../utils/formaterDate";

const Cards = ({
  title,
  company,
  location,
  salary,
  type,
  date,
  img
}) => {

  return (
    <div className="card-structure group relative">
      <div className="flex gap-2 h-20 bg-white px-2 py-2">
        <div className="w-20 bg-white border-2 border-slate-300 rounded-md flex overflow-hidden">
          <img src={img} alt="" className="self-center" />
        </div>
        <div className="self-center">
          <h1 className="text-lg font-bold">{title}</h1>
          <h2 className="text-sm font-semibold">{company}</h2>
        </div>
      </div>
      <div className="group-hover:blur-sm group-hover:backdrop-brightness-90">
        <div className="mb-2">
          <div className="flex gap-2 px-2">
            <IoLocationSharp className="text-slate-400 text-md mt-1" />
            <h2 className="text-lg">{location}</h2>
          </div>
          <div className="flex gap-2 px-2">
            <FaMoneyCheck className="text-slate-400 text-md mt-1" />
            <h2 className="text-lg">{salary.toLocaleString("id-ID")}</h2>
          </div>
          <div className="flex gap-2 px-2">
            <PiBagFill className="text-slate-400 text-md mt-1" />
            <h2 className="text-lg">{type}</h2>
          </div>
        </div>
        <div className="w-full bg-slate-300 py-1 px-2">
          <div className="flex justify-between">
            <h1 className="text-sm font-medium self-center">{foramterDate(date)}</h1>
            <h2 className="text-sm font-semibold px-4 py-1 bg-slate-400 rounded-lg">
              Junior Intern
            </h2>
          </div>
        </div>
      </div>
      <div className="hidden group-hover:flex absolute inset-0 items-center justify-center mt-20">
        <div className="text-center">
          <Link to={`/internship`}>
            <button className="mx-2 px-4 py-2 bg-secondary text-white font-semibold rounded-lg">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;
