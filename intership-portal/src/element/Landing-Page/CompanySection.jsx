import React from "react";
import { company1, company2 } from "../../assets/data/company";
import Marquee from 'react-fast-marquee'
const CompanySection = () => {
  return (
    <div className="">
      <h1 className="text-2xl text-white font-bold text-center lg:text-4xl">Our Hiring Partners</h1>
      <p className="text-center text-white text-sm font-normal lg:text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, error!
      </p>
      <div className="bg-white mt-4 rounded-lg shadow-md">
        <Marquee autoFill pauseOnHover>
            {company1.map((item, index) => (
                <div key={item.id} className="p-2">
                    <img src={item.img} alt="" width={100}/>
                </div>
            ))}
        </Marquee>
        <Marquee autoFill direction="right" pauseOnHover>
            {company2.map((item, index) => (
                <div key={item.id} className="px-2">
                    <img src={item.img} alt="" width={100}/>
                </div>
            ))}
        </Marquee>
        
      </div>
    </div>
  );
};

export default CompanySection;
