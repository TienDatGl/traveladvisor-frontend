import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDataMyTrip } from "../redux/mytripSlice";
import Slideshow from "../components/My_Trip_Component/SlideShow";
import { AiOutlineSchedule } from "react-icons/ai";
import { SlLocationPin } from "react-icons/sl";
import { Link, useNavigate, useParams } from "react-router-dom";

import bana from "../assets/TripImg/bana.jpg";
import hoian from "../assets/TripImg/hoian.jpg";
import dragonBridge from "../assets/TripImg/dragonbrigde.jpeg";
import francevillage from "../assets/TripImg/francevillage.jpg";
import pagoda from "../assets/TripImg/pagoda.jpg";
import nguhanhson from "../assets/TripImg/nguhanhson.jpg";

import { FaArrowRight } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const MyTrip = () => {
  const { filterby } = useParams();
  const API = process.env.REACT_APP_SERVER_DOMAIN;
  const dispatch = useDispatch();
  const myTripData = useSelector((state) => state.myTrip.mytripList);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const imgList = [
    hoian,
    bana,
    dragonBridge,
    francevillage,
    pagoda,
    nguhanhson,
  ];

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API}trip/mytrips/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setDataMyTrip(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [API]);

  const handleDeleteTrip = async (id) => {
    try {
      const res = await axios.delete(`${API}deletetrip/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      fetchData();
    }
  };

  const directDetail = (tripId) => {
    navigate(`/mytripdetail/${tripId}`);
  };

  return (
    <div className="flex w-full flex-col items-center gap-4 px-[1rem] sm:px-[10rem] sm:py-[3rem]">
      <div className="text-[20px] font-bold">My Trips</div>
      <div className="flex w-full gap-2 sm:w-3/5">
        <button className="border-1 w-full rounded px-[1rem] py-[0.5rem] text-[18px] font-bold hover:bg-black hover:text-white sm:px-[5rem] sm:py-[1rem]">
          Create a trip
        </button>
        <button className="border-1 w-full rounded px-[1rem] py-[0.5rem] text-[18px] font-bold hover:bg-black hover:text-white sm:px-[5rem] sm:py-[1rem]">
          Create a trip with AI
        </button>
      </div>
      <div className="flex w-full flex-col items-center gap-2">
        {myTripData.map((trip, index) => {
          const randomItem =
            imgList[Math.floor(Math.random() * imgList.length)];
          const firstDay = trip.items[0].day;
          const lastDay = trip.items[trip.items.length - 1].day;
          return (
            <div
              className="relative mb-3 flex w-full rounded border border-slate-400 hover:cursor-pointer hover:opacity-70 sm:w-3/5"
              key={trip.id}
              onClick={() => directDetail(trip.id)}
            >
              <img
                className="h-[152px] w-[40%] rounded-l object-cover sm:h-[200px]"
                src={randomItem}
                alt=""
              />
              <div className="flex flex-col gap-2 p-[1rem] sm:p-[2rem]">
                <div className="text-2xl font-semibold">{trip.name}</div>
                <div className="flex items-center gap-2">
                  <AiOutlineSchedule />
                  {firstDay}
                  <FaArrowRight />
                  {lastDay}
                </div>
                <div className="flex items-center gap-2">
                  <SlLocationPin />
                  Đà Nẵng
                </div>
              </div>
              <div
                onClick={() => handleDeleteTrip(trip.id)}
                className="absolute right-[10px] top-[10px] h-7 w-7 cursor-pointer rounded-full p-[2px] hover:bg-[red] hover:text-white"
              >
                <IoClose className="text-[25px]" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyTrip;
