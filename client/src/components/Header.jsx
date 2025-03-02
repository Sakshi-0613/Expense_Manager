import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContent } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Header = ({ darkMode }) => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContent);

  const handleGetStarted = async () => {
    if (!userData?.userId) {
      toast.error('User not logged in.');
      return;
    }

    try {
      const [expensesRes, incomeRes] = await Promise.all([
        axios.get('http://localhost:4000/api/expenses/', { params: { userId: userData.userId } }),
        axios.get('http://localhost:4000/api/income/', { params: { userId: userData.userId } }),
      ]);

      if (expensesRes.data.length > 0 || incomeRes.data.length > 0) {
        navigate('/dashboard');
      } else {
        navigate('/add-income');
      }
    } catch (error) {
      toast.error('Something went wrong.');
    }
  };

  console.log("Assets: ", assets); // Debugging line

  return (
    <div className={`flex flex-col items-center mt-20 px-4 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      {assets.header_img ? (
        <img src={assets.header_img} alt="User" className="w-36 h-36 rounded-full mb-6" />
      ) : (
        <p className="text-red-500">Image not found</p>
      )}
      
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        Hey {userData?.name || 'Buddy'}! 
        <img className="w-8 aspect-square" src={assets.hand_wave} alt="Wave" />
      </h1>
      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        Welcome to Expense Management System
      </h2>
      <p className="mb-8 max-w-md">
        Let's start with a quick product tour to get you up and running!
      </p>
      <button onClick={handleGetStarted}  
        className={`border rounded-full px-8 py-2.5 transition-all ${darkMode ? 'border-gray-300 hover:bg-gray-700' : 'border-gray-500 hover:bg-gray-100'}`}>
        Get Started
      </button>
    </div>
  );
};

export default Header;
