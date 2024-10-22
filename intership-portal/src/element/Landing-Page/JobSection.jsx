import React, { useEffect } from "react";
import { HashLoader } from 'react-spinners'
import { IoIosArrowRoundForward } from "react-icons/io";
import DataNotFound from "../../components/DataNotFound";
import CardsHome from "../../components/CardsHome"
import { loker } from "../../assets/data/company";
import { Link } from "react-router-dom";

const JobSection = () => {
  return (
    <div>
      <h1 className="text-3xl font-extrabold">
        Discover your next career move with us today!
      </h1>
      <p className='mt-1 mb-10 text-slate-500 font-medium sm:w-[90%] md:w-[80%] xl:w-[70%]'>Embark on a transformative journey where your ambitions meet boundless opportunities—discover your next career move with us today and unlock the future you deserve.</p>
      <div className="flex justify-between">
        <div className="flex">
          <input type="text" className="w-24 sm:w-full py-1 px-4 sm:py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-black peer" placeholder="Search" />
          <button className="px-4 py-1 sm:py-2 bg-black text-white font-semibold rounded-r-lg peer-focus:ring-1 peer-focus:ring-black">Search</button>
        </div>
        <Link to={"/internship"}>
          <div className="px-4 py-1 sm:py-2 bg-black flex gap-1 rounded-lg text-white cursor-pointer hover:font-bold">
            <h1 className="text-sm font-semibold">View More</h1>
            <IoIosArrowRoundForward className="text-2xl" />
          </div>
        </Link>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {loker.length > 0 ? (
          loker.map(item => (
            <CardsHome key={item.id} {...item} />
          ))
        ) : (
          <DataNotFound>
            No Job Available
          </DataNotFound>
        )}
      </div>
    </div>
  );
};

export default JobSection;
