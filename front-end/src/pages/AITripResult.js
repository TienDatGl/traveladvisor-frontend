import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Map from "../components/Trip_Create_Component/TripCreateCard/Map";
import Typist from "react-typist";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
  MdBreakfastDining,
} from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { FaLocationDot, FaRegStar, FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { RxPencil2 } from "react-icons/rx";

import { useDispatch, useSelector } from "react-redux";
import {
  setTripDatabyAI,
  getLocationArray,
  resetLocation,
} from "../redux/tripSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import toast from "react-hot-toast";
import axios from "axios";
import { IoRestaurantSharp } from "react-icons/io5";
import { TiLocationArrow } from "react-icons/ti";
import { BiSolidHotel } from "react-icons/bi";
import { CiAirportSign1 } from "react-icons/ci";
import { FaRegAddressBook } from "react-icons/fa";
import imgReplace from "../assets/img/hoian.jpg";
import { IoWifi } from "react-icons/io5";
import { RiParkingBoxLine } from "react-icons/ri";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";

const AITripResult = () => {
  const initialData = useSelector((state) => state.tripCreate);
  console.log("INTIAL DATA: ", initialData);
  const locationData = useSelector((state) => state.location);
  const hotelRecommend = useMemo(
    () =>
      locationData.locationList.filter((location) => {
        return location.category.name == "Hotel";
      }),
    [locationData],
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Get random hotel
  function getRandomElements(arr, count) {
    const result = [];
    const usedIndices = new Set();

    while (result.length < count && result.length < arr.length) {
      const randomIndex = Math.floor(Math.random() * arr.length);

      if (!usedIndices.has(randomIndex)) {
        result.push(arr[randomIndex]);
        usedIndices.add(randomIndex);
      }
    }

    return result;
  }

  const recommendedHotel = getRandomElements(hotelRecommend, 3);
  console.log("HOTEL RECOMMENED: ", recommendedHotel);
  const tripCreateAPI = process.env.REACT_APP_SERVER_DOMAIN;

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const tripData = location?.state;

  const destination = tripData.destination;
  const startDate = tripData.startDate;
  const endDate = tripData.endDate;
  const dayLength = tripData.dayLength;
  const travelers = tripData.travelers;
  const activities = tripData.activities;

  const fullResData = tripData.tripData.data;
  const tripPlan = tripData.tripData.data.tripPlan;
  console.log("TRIP PLAN: ", tripPlan);

  const [showContentAfterTyping, setShowContentAfterTyping] = useState(false);
  const [showDes, setShowDes] = useState({});
  //dispatch

  useEffect(() => {
    const dataDispatch = tripPlan.map((item) => {
      const locationDescriptionMap = item.locations.reduce((map, location) => {
        map[location.locationID] = location.locationDescription;
        return map;
      }, {});

      const filteredAndUpdatedLocationList = locationData.locationList
        .filter((location) => locationDescriptionMap[location.id])
        .map((location) => ({
          ...location,
          locationDescription: locationDescriptionMap[location.id],
        }))
        .reverse();

      return {
        day: item.day,
        description: item.description,
        locations: filteredAndUpdatedLocationList,
      };
    });

    dispatch(setTripDatabyAI(dataDispatch));
  }, [tripPlan, locationData]);

  const toggleDescription = (index) => {
    setShowDes((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleGetLocationArray = (day) => {
    dispatch(getLocationArray(day));
  };

  const handleTripCreate = async (e) => {
    e.preventDefault();
    const data = {
      name: initialData.name,
      days: initialData.items.length,
      user: initialData.user,
      create_by: 1,
      items: initialData.items.map((item) => {
        return {
          ...item,
          day: item.day,
          locations: item.locations.map((location) => location.id),
        };
      }),
    };

    if (data) {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.post(
          `${tripCreateAPI}trip/create/`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const dataRes = response.data;

        if (dataRes.message) {
          toast.success(dataRes.message);
          navigate("/");
          dispatch(resetLocation());
        } else if (dataRes.error) {
          toast.error(dataRes.error);
        }
      } catch (error) {
        // Handle errors here
        console.error(error);
        toast.error("Login again!");
      }
    }
  };

  const RecommendedHotelSlider = ({ hotels }) => {
    return (
      <div className="mb-[40px] border-b pb-[24px]">
        <h2>Places to stay</h2>
        <p className="opacity-[70%]">
          We've also recommended some places to stay during your trip.
        </p>
        <Slider {...settings} className="mt-6">
          {hotels.map((hotel, index) => (
            <div key={index} className="flex p-2 sm:p-4">
              <div className="flex flex-col gap-[15px] rounded-[12px] border-[1px] border-[#ccc] p-4">
                <div className="flex gap-[15px]">
                  {hotel.image ? (
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="hotel-image h-[100%] w-[45%] rounded-lg"
                    />
                  ) : (
                    <img
                      src={imgReplace}
                      alt={hotel.name}
                      className="hotel-image h-[100%] w-[45%] rounded-lg"
                    />
                  )}
                  <div className="flex flex-col gap-[8px]">
                    <div className="text-[16px] font-semibold sm:text-[18px]">
                      {hotel.name}
                    </div>
                    <div className="flex items-center text-[13px] font-[600] sm:text-[14px]">
                      <div className="mr-[5px] flex">{stars(5)}</div> 23 reviews
                    </div>
                    <div className="flex items-center text-[13px] sm:text-[14px]">
                      <FaRegAddressBook className="mr-[4px] text-[16px] sm:text-[19px]" />
                      {hotel.address}
                    </div>
                    <div className="flex items-center text-[13px] sm:text-[14px]">
                      <BiSolidHotel className="mr-[4px] text-[16px] sm:text-[20px]" />
                      {hotel.category.name} • $$$
                    </div>
                    <div className="flex items-center text-[13px] sm:text-[14px]">
                      <CiAirportSign1 className="mr-[4px] text-[16px] sm:text-[20px]" />
                      {hotel.airport_distance} km to airport
                    </div>
                  </div>
                </div>
                <div className="h-[1px] w-full bg-[#ccc]"></div>
                <div className="flex flex-col gap-[10px]">
                  <div className="mb-[-10px] flex gap-[5px]">
                    <span className="flex items-center gap-1 text-[14px]">
                      <MdOutlineFreeBreakfast className="text-[16px]" />
                      Free breakfast
                    </span>
                    <span className="flex items-center gap-1 text-[14px]">
                      {" "}
                      <RiParkingBoxLine className="text-[16px]" />
                      Free parking
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-[14px]">
                    <IoWifi className="text-[16px]" />
                    Free High Speed Internet (WiFi)
                  </span>
                  <div className="flex gap-2">
                    <TbFileDescription className="h-[30px] text-[60px]" />
                    <div className="text-[14px]">
                      Charming hotel boasting polite, friendly staff, and
                      excellent service. Centrally located with clean rooms,
                      ocean views, and delightful breakfast options. Rooftop
                      pool and bar offer stunning vistas. Free airport shuttle
                      with amenities for added convenience. A luxurious and
                      comfortable stay.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  };

  const stars = (rating) => {
    const star = [];

    if (!rating || rating <= 0) {
      for (let i = 0; i < 5; i++) {
        star.push(<FaRegStar className="mr-[2px] text-[#FF7757]" key={i} />);
      }
      return star;
    } else {
      const fullStars = Math.floor(rating);
      for (let i = 0; i < fullStars; i++) {
        star.push(<FaStar className="mr-[2px] text-[#FF7757]" key={i} />);
      }

      return star;
    }
  };

  return (
    <div>
      <div className="trip-plan-container py-[20px]">
        <div className="relative mb-[40px] flex w-full justify-center border-b pb-[20px] font-[600]">
          {destination} Itinerary
          <div
            className="absolute right-[30px] text-[30px] hover:cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <IoCloseOutline />
          </div>
        </div>
        <div className="m-auto flex w-auto flex-col justify-center sm:w-[1300px] sm:flex-row sm:px-[17rem]">
          <div className="px-[1.5rem] sm:max-w-[52%] sm:pl-[20px] sm:pr-[60px]">
            <div className="mb-[24px] border-b pb-[24px]">
              <p className="flex items-center text-[12px] font-[400] opacity-[70%]">
                <div className="mr-[7px] rounded-full bg-[#4A92DE] p-[6px] text-[13px] text-white opacity-100">
                  <FaLocationDot />
                </div>
                This trip is powered by AI.
              </p>
              <h2 className="mb-[20px] text-[28px] font-[700]">
                Your trip to {destination} for {dayLength} days
              </h2>
              <Typist
                cursor={{ show: false }}
                avgTypingDelay={10}
                stdTypingDelay={3}
                startDelay={0}
                onTypingDone={() => {
                  setShowContentAfterTyping(true);
                }}
              >
                <p className="text-[20px]">{fullResData.introduction}</p>
              </Typist>
            </div>
            {showContentAfterTyping && (
              <>
                <RecommendedHotelSlider hotels={recommendedHotel} />
                <div className="order-b mb-[24px] pb-[24px]">
                  {initialData.items.map((dayPlan, index) => (
                    <div
                      key={index}
                      onMouseOver={() => handleGetLocationArray(dayPlan.day)}
                    >
                      <h3>{dayPlan.day}</h3>
                      <p className="text-[20px]">{dayPlan.description}</p>
                      <ul className="mb-0 p-0">
                        {dayPlan.locations.map((location, index) => (
                          <li key={index} className="relative flex">
                            <div className="mr-[20px] flex h-[24px] w-[24px] items-center justify-center rounded-full bg-black p-[16px] text-[12px] text-white">
                              {index + 1}
                            </div>
                            <div className="mb-[40px] mt-[6px] w-full border-b pb-[10px]">
                              <h4
                                className="mb-[12px] flex items-center text-[1rem] font-[640] hover:cursor-pointer hover:underline sm:text-[23px]"
                                onClick={() => toggleDescription(index)}
                              >
                                <div className="mr-[7px]">
                                  <RxPencil2 />
                                </div>
                                {location.name}
                              </h4>
                              {showDes[index] && (
                                <div className="mb-[16px]">
                                  {location.image ? (
                                    <img
                                      className="mb-[12px] h-[230px] w-[100%] rounded-[12px]"
                                      src={location.image}
                                    ></img>
                                  ) : (
                                    <img
                                      className="mb-[12px] h-[230px] w-[100%] rounded-[12px]"
                                      src={imgReplace}
                                    ></img>
                                  )}
                                  <p className="mb-[4px] flex items-center font-[640] hover:cursor-pointer hover:underline sm:text-[23px]">
                                    {location.name}
                                  </p>
                                  <div className="mb-[15px] flex items-center text-[18px] font-[600]">
                                    <div className="mr-[5px] flex">
                                      {stars(5)}
                                    </div>{" "}
                                    230 reviews
                                  </div>
                                  <div className="flex">
                                    {location.category.name == "Restaurant" && (
                                      <div className="flex">
                                        <IoRestaurantSharp className="mr-[4px] text-[20px]" />
                                        {location.category.name} • Diner •
                                        Central Asian • $
                                      </div>
                                    )}
                                    {location.category.name ==
                                      "Sight Seeing" && (
                                      <div className="flex">
                                        <TiLocationArrow className="text-[23px]" />
                                        {location.category.name} • Visit •
                                        Points of Interest • $$$
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                              {showDes[index] && (
                                <div>
                                  <p className="mb-[2px] border-t-[1px] border-[#ccc] pt-[16px] text-[20px]">
                                    {location.locationDescription}
                                  </p>
                                  <p className=" font-[650] underline">
                                    Read more
                                  </p>
                                </div>
                              )}
                            </div>
                            {index !== dayPlan.locations.length - 1 && (
                              <div
                                className={`absolute left-[16px] top-[45px] -translate-x-1/2 transform ${showDes[index] ? "h-[88%]" : "h-[35px]"}`}
                                style={{
                                  backgroundColor: "black",
                                  width: "0.1px",
                                }}
                              ></div>
                            )}
                            <div
                              className="mt-[6px] h-[15px] text-[27px]"
                              onClick={() => toggleDescription(index)}
                            >
                              {showDes[index] ? (
                                <MdOutlineKeyboardArrowUp />
                              ) : (
                                <MdOutlineKeyboardArrowDown />
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <p className="text-[20px]">{fullResData.conclusion}</p>
              </>
            )}
            <button
              className="mt-[10px] w-[100%] border border-slate-900 bg-black px-4 py-2 text-white hover:opacity-80 sm:w-[auto]"
              onClick={handleTripCreate}
            >
              CREATE
            </button>
          </div>
          <div className="sticky top-0 h-[47vh] w-[100%] py-[30px] sm:h-[78vh] sm:w-[50%]">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITripResult;
