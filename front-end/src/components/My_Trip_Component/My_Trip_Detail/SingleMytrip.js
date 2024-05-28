import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BgSingleMytrip from "./BgSingleMytrip";
import { useSelector } from "react-redux";
import Map from "../../Trip_Create_Component/TripCreateCard/Map";
import TripList from "../../Trip_Create_Component/TripCreateCard/TripList";
import TripInfo from "../../Trip_Create_Component/TripCreateCard/Trip_List_Component/TripInfo";
import TripCreateModel from "../../Trip_Create_Component/TripCreateModel";
import TripCancel from "../../Trip_Create_Component/TripCancel";
import toast from "react-hot-toast";
import axios from "axios";

const SingleMytrip = () => {
  const { filterby } = useParams();
  const myTripDetail = useSelector((state) => state.myTrip.mytripList);
  const singleMytrip = myTripDetail.filter(
    (trip) => trip.id === parseInt(filterby),
  )[0];
  const navigate = useNavigate();

  const tripCreateAPI = process.env.REACT_APP_SERVER_DOMAIN;

  console.log("singleMytrip Trip create page", singleMytrip);

  const formatDateTripInfo = (input) => {
    const date = new Date(input);
    const options = { month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const [isActive, setIsActive] = useState(false);
  const [cancelIsActive, setCancelIsActive] = useState(false);

  const handleActive = () => {
    setIsActive((prev) => !prev);
  };
  const handleCancelActive = () => {
    setCancelIsActive((prev) => !prev);
  };

  const handleTripCreate = async (e) => {
    e.preventDefault();
    const data = {
      name: singleMytrip.name,
      days: singleMytrip.days,
      user: singleMytrip.user,
      create_by: 0,
      items: singleMytrip.items.map((item) => {
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

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // Customize the confirmation message
      const confirmationMessage = "Are you sure you want to leave this page?";

      // Display the confirmation message when the user tries to reload or leave the page
      e.returnValue = confirmationMessage;

      // Some additional action you want to perform before unloading the page
      // For example, saving data, making an API call, etc.
      // You can put your code here.

      // Note: Some browsers may not display the custom message.
    };

    // Attach the beforeunload event handler when the component mounts
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  //   Map

  return (
    <div className="flex flex-col px-[1rem] sm:flex-row sm:px-[5rem]">
      {isActive && <TripCreateModel active={handleActive} />}
      {cancelIsActive && <TripCancel active={handleCancelActive} />}
      <div className="w-full sm:mx-8 sm:w-2/3">
        <div className="w-full">
          <TripInfo
            name={singleMytrip.name}
            firstDay={formatDateTripInfo(singleMytrip.items[0].day)}
            lastDay={formatDateTripInfo(
              singleMytrip.items[singleMytrip.items.length - 1].day,
            )}
            days={singleMytrip.days}
          />
          <TripList
            days={singleMytrip.items}
            data={singleMytrip}
            active={handleActive}
          />
        </div>
        <div className="mb-10 flex items-center justify-between border-t border-t-slate-900 py-5">
          <button
            onClick={handleCancelActive}
            className="mt-5 rounded-lg border border-slate-700 px-6 py-2 text-base font-bold text-slate-800 hover:bg-slate-900 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleTripCreate}
            className="ml-12 mt-5 rounded-lg border border-slate-700 px-6 py-2 text-base font-bold text-slate-800 hover:bg-slate-900 hover:text-white"
          >
            Complete
          </button>
        </div>
      </div>
      <div className="sticky top-4 mt-[34px] h-full w-full overflow-hidden rounded-lg sm:mx-8 sm:mb-8 sm:w-1/2">
        <Map />
      </div>
    </div>
  );
};

export default SingleMytrip;
