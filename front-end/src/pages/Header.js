import React, { useEffect, useState, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/img/Logo.png";
import avt from "../assets/img/avt.jpg";
import { useSelector, useDispatch } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import toast from "react-hot-toast";
import {
  FaStar,
  FaBed,
  FaPlane,
  FaHeart,
  FaUser,
  FaWallet,
  FaChevronRight,
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { MdOutlineSupportAgent } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { SlNote } from "react-icons/sl";
import { FaBook } from "react-icons/fa";
import { IoBookmarksSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaChevronDown } from "react-icons/fa";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [showMenu, setShowMenu] = useState(false);
  const [showMenuMobile, setShowMenuMobile] = useState(false);
  const ref = useRef(null);

  const handleNavLinkClick = (path) => {
    setActiveLink(path);
    setIsMobileMenuOpen(false); // Close the mobile menu when a link is clicked
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleShowMenuMobile = () => {
    setShowMenuMobile((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logoutRedux());
    toast.success("Logout successfully");
  };

  const userData = useSelector((state) => state.user);

  const [showTripsMenu, setShowTripsMenu] = useState(false);

  const handleShowTripsMenu = () => {
    setShowTripsMenu((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowMenu(false);
      setShowTripsMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <header className="shadow-sm">
      <nav className="sm-h-[87px] h-[52px] w-full bg-white px-[1rem] sm:px-[5.5rem]">
        <div
          className="sm-h-[87px] mx-auto flex h-[52px] w-full items-center justify-between"
          ref={ref}
        >
          <div className="hidden h-full items-center font-semibold sm:flex">
            <NavLink
              to="/"
              className={`mr-4 flex h-full items-center border-b-[3px] border-transparent md:mr-8 ${activeLink === "/" ? "border-black" : ""}`}
              onClick={() => handleNavLinkClick("/")}
            >
              <FaBed className="text-xl sm:mr-2" />
              <span className="hidden md:inline">Finds Stays</span>
            </NavLink>
            <div className="relative mr-4 flex h-full items-center md:mr-8">
              <div
                className={`flex cursor-pointer items-center ${activeLink === "/tripcreate" || activeLink === "/tripcreateAI" ? "border-black" : ""}`}
                onClick={handleShowTripsMenu}
              >
                <FaPlane className="text-xl sm:mr-2" />
                <span className="hidden md:inline">Trips</span>
                <FaChevronDown className="ml-1 text-sm" />
              </div>
              {showTripsMenu && (
                <div className="absolute top-full z-10 mt-2 w-[15rem] rounded-md bg-white p-[1rem] shadow-lg">
                  <NavLink
                    to="/tripcreate"
                    className="block px-[0.5rem] py-2 text-black hover:bg-gray-100"
                    onClick={() => handleNavLinkClick("/tripcreate")}
                  >
                    Create a new trip
                  </NavLink>
                  <NavLink
                    to="/tripcreateAI"
                    className="block px-[0.5rem] py-2 text-black hover:bg-gray-100"
                    onClick={() => handleNavLinkClick("/tripcreateAI")}
                  >
                    Create a new trip with AI
                  </NavLink>
                  <NavLink
                    to="/mytrip"
                    className="block px-[0.5rem] py-2 text-black hover:bg-gray-100"
                    onClick={() => handleNavLinkClick("/mytrip")}
                  >
                    View my trips
                  </NavLink>
                </div>
              )}
            </div>
          </div>

          <NavLink to="/" className="flex items-center justify-center">
            <img
              src={logo}
              alt="Trip Advisor Logo"
              className="h-8 w-8 md:h-10 md:w-10"
            />
            <span className="ml-2 text-xl font-bold md:text-2xl">
              Travel Advisor
            </span>
          </NavLink>

          <div className="hidden items-center justify-end md:flex">
            <div className="flex items-center text-lg font-bold">
              <FaHeart className="mr-2" /> Favourites
            </div>
            <div className="mx-4 text-lg font-bold">|</div>
            {userData.email ? (
              <div
                className="relative flex cursor-pointer items-center"
                onClick={handleShowMenu}
              >
                <img src={avt} alt="avt" className="h-11 w-11 rounded-full" />
                <span className="ml-2 text-lg font-bold capitalize">
                  {userData.user}
                </span>
                {showMenu && (
                  <div className="absolute right-0 top-12 z-50 flex w-80 flex-col rounded-md bg-white p-8 shadow-lg">
                    <ul className="w-full p-0 text-base font-normal">
                      <div className="relative flex cursor-pointer items-center">
                        <img
                          src={avt}
                          alt="avt"
                          className="mr-4 h-16 w-16 rounded-full"
                        />
                        <div className="flex flex-col">
                          <p className="mb-1 text-lg font-bold capitalize">
                            {userData.user}
                          </p>
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-green-500">
                              .
                            </div>
                            <p className="ml-2 text-lg capitalize">Online</p>
                          </div>
                        </div>
                      </div>

                      <div className="my-6 h-0.5 w-full bg-gray-300"></div>
                      <NavLink
                        className="flex justify-between"
                        to="userprofile"
                      >
                        <li className="mb-4 flex items-center">
                          <FaUser className="mr-2 h-4 w-4" /> My account
                        </li>
                        <FaChevronRight className="mt-1" />
                      </NavLink>
                      <NavLink className="flex justify-between" to="/">
                        <li className="mb-4 flex items-center">
                          <FaWallet className="mr-2 h-4 w-4" /> Payment
                        </li>
                        <FaChevronRight className="mt-1" />
                      </NavLink>
                      <NavLink className="flex justify-between" to="/">
                        <li className="mb-4 flex items-center">
                          <FaGear className="mr-2 h-4 w-4" /> Settings
                        </li>
                        <FaChevronRight className="mt-1" />
                      </NavLink>

                      <li
                        className="flex cursor-pointer items-center hover:text-red-600"
                        onClick={handleLogout}
                      >
                        <IoLogOut className="mr-2 h-5 w-5" />
                        Log out
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center">
                <NavLink to="login">
                  <button className="mr-2 flex items-center rounded-md border border-black px-4 py-2 text-lg hover:opacity-70">
                    Log in
                  </button>
                </NavLink>
                <NavLink to="signup">
                  <button className="mr-2 flex items-center rounded-md border border-black bg-black px-4 py-2 text-lg text-white hover:opacity-70">
                    Sign up
                  </button>
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button onClick={toggleMobileMenu}>
              <GiHamburgerMenu className="text-2xl" />
            </button>
          </div>

          {/* Mobile Menu */}
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="absolute right-[4%] top-[6%] z-10 flex w-[50%] flex-col space-y-2 rounded-md bg-white p-4 shadow-lg">
              <NavLink
                to="/"
                className={`mr-4 flex h-full items-center border-b-[3px] border-transparent md:mr-8`}
                onClick={() => handleNavLinkClick("/")}
              >
                <FaBed className="mr-2 text-xl" />
                <span className="inline">Finds Stays</span>
              </NavLink>
              <div className="flex flex-col">
                <div
                  className="flex cursor-pointer items-center"
                  onClick={handleShowTripsMenu}
                >
                  <FaPlane className="mr-2 text-xl" />
                  <span className="inline">Trips</span>
                  <FaChevronDown className="ml-1 text-sm" />
                </div>
                {showTripsMenu && (
                  <div className="flex flex-col pl-[1.8rem]">
                    <NavLink
                      to="/tripcreate"
                      className="mt-2 text-black hover:bg-gray-100"
                      onClick={() => handleNavLinkClick("/tripcreate")}
                    >
                      Create new trip
                    </NavLink>
                    <NavLink
                      to="/tripcreateAI"
                      className="mt-2 text-black hover:bg-gray-100"
                      onClick={() => handleNavLinkClick("/tripcreateAI")}
                    >
                      Create new AI trip
                    </NavLink>
                    <NavLink
                      to="/mytrip"
                      className="mt-2 text-black hover:bg-gray-100"
                      onClick={() => handleNavLinkClick("/mytrip")}
                    >
                      View my trips
                    </NavLink>
                  </div>
                )}
              </div>
              {userData.email ? (
                <>
                  <NavLink to="userprofile" className="flex items-center">
                    <FaUser className="mr-2 h-4 w-4" /> My account
                  </NavLink>
                  <NavLink to="/" className="flex items-center">
                    <FaWallet className="mr-2 h-4 w-4" /> Payment
                  </NavLink>
                  <NavLink to="/" className="flex items-center">
                    <FaGear className="mr-2 h-4 w-4" /> Settings
                  </NavLink>
                  <div
                    className="flex cursor-pointer items-center hover:text-red-600"
                    onClick={handleLogout}
                  >
                    <IoLogOut className="mr-2 h-5 w-5" />
                    Log out
                  </div>
                </>
              ) : (
                <div className="flex items-center">
                  <NavLink to="login">
                    <button className="mr-2 flex items-center rounded-md border border-black px-4 py-2 text-lg hover:opacity-70">
                      Log in
                    </button>
                  </NavLink>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
