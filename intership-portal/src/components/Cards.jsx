import React, { useEffect } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { FaMoneyCheck } from "react-icons/fa";
import { PiBagFill } from "react-icons/pi";
import { foramterDate } from "../utils/formaterDate";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/Action/LoginAction";
import intern from '../assets/img/intern.jpg'

const Cards = ({
  id,
  jobTitle,
  User,
  jobType,
  salary,
  jobPost,
  deadline,
}) => {

  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  return (
    <div className="card-structure group relative">
      <div className="flex gap-2 h-20 bg-white px-2 py-2">
        <div className="w-20 bg-white border-2 border-slate-300 rounded-md flex overflow-hidden">
          <img src={User.profile === null ? intern : User.profile} alt="" className="self-center" />
        </div>
        <div className="self-center">
          <h1 className="text-lg font-bold">{jobTitle}</h1>
          <h2 className="text-sm font-semibold">{User.name}</h2>
        </div>
      </div>
      <div className="group-hover:blur-sm group-hover:backdrop-brightness-90">
        <div className="mb-2">
          <div className="flex gap-2 px-2">
            <IoLocationSharp className="text-slate-400 text-md mt-1" />
            <h2 className="text-lg">{User.alamat === null ? "No data" : User.alamat}</h2>
          </div>
          <div className="flex gap-2 px-2">
            <FaMoneyCheck className="text-slate-400 text-md mt-1" />
            <h2 className="text-lg">{salary.toLocaleString("id-ID")}</h2>
          </div>
          <div className="flex gap-2 px-2">
            <PiBagFill className="text-slate-400 text-md mt-1" />
            <h2 className="text-lg">{jobType}</h2>
          </div>
        </div>
        <div className="w-full bg-slate-300 py-1 px-2">
          <div className="flex justify-between">
            <h1 className="text-sm font-medium self-center">{foramterDate(deadline)}</h1>
            <h2 className="text-sm font-semibold px-4 py-1 bg-slate-400 rounded-lg">
              Junior Intern
            </h2>
          </div>
        </div>
      </div>
      <div className="hidden group-hover:flex absolute inset-0 items-center justify-center mt-20">
        <div className="text-center">
          {user && user.role === "tim-magang" ? (
            <a href={`/company-dashboard/internship/${id}`}>
              <button className="mx-2 px-4 py-2 bg-secondary text-white font-semibold rounded-lg">View Details</button>
            </a>
          ) : (
            <a href={`/internship/${id}`}>
              <button className="mx-2 px-4 py-2 bg-secondary text-white font-semibold rounded-lg">View Details</button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cards;
