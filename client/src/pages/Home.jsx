import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import { AppContent } from '../context/AppContext';

const Home = () => {
  const { userData } = useContext(AppContent);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-900' : 'bg-gradient-to-br from-blue-200 to-purple-400 text-gray-900'}`}> 
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="mt-24 text-center px-6"> 
        <Header darkMode={darkMode} />
      </div>

      {/* Feature Highlights */}
      <div className="py-12 text-center px-6"> 
        <h2 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">Why Choose Our Expense Manager?</h2>
        <p className="text-lg max-w-2xl mx-auto text-gray-900 mb-6">Our platform helps you track expenses effortlessly, manage budgets, and ensure financial security with a seamless experience.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8">
          <div className="p-6 rounded-xl shadow-lg bg-white/10 backdrop-blur-md text-gray-900 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-2">Track Expenses</h3>
            <p className="text-sm">Easily log and categorize your expenses in one place.</p>
          </div>
          <div className="p-6 rounded-xl shadow-lg bg-white/10 backdrop-blur-md text-gray-900 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-2">Budget Smartly</h3>
            <p className="text-sm">Set budgets and get alerts to stay on track.</p>
          </div>
          <div className="p-6 rounded-xl shadow-lg bg-white/10 backdrop-blur-md text-gray-900 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-2">Secure & Fast</h3>
            <p className="text-sm text-gray-900">Enjoy a seamless and secure expense tracking experience.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
