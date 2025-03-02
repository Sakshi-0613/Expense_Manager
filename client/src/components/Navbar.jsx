import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

const Navbar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/send-verify-otp");
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) navigate("/email-verify");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      if (data.success) {
        setIsLoggedin(false);
        setUserData(null);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-14 sm:h-16 flex justify-between items-center px-4 sm:px-6 bg-inherit shadow-md z-50">
      {/* Logo */}
      <img src={assets.logo} alt="Logo" className="w-8 sm:w-12 h-auto ml-2 sm:ml-4" />

      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition">
          {darkMode ? <SunIcon className="w-6 h-6 text-yellow-400" /> : <MoonIcon className="w-6 h-6 text-gray-700" />}
        </button>

        {/* Profile Dropdown */}
        {userData ? (
          <div className="relative profile-dropdown">
            <div
              className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {userData.name[0].toUpperCase()}
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-gray-100 dark:bg-gray-700 rounded shadow-lg w-40">
                <ul className="p-2 text-sm">
                  {!userData.isAccountVerified && (
                    <li onClick={sendVerificationOtp} className="py-2 px-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer">
                      Verify Email
                    </li>
                  )}
                  <li onClick={logout} className="py-2 px-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer">
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => navigate("/login")} className="border border-gray-500 rounded-full px-6 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            Login <img src={assets.arrow_icon} alt="" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
