import React, { useState, useContext } from "react";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const AddIncome = () => {
  const { backendUrl, userData } = useContext(AppContent);
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !source) return alert("Please fill all fields!");

    setLoading(true);
    try {
      await axios.post(`${backendUrl}/api/income/add`, {
        userId: userData.userId,
        source,
        amount: parseFloat(amount),
        date: new Date().toISOString(),
      });

      alert("Income Added Successfully!");
      navigate("/income");
    } catch (error) {
      console.error("Error adding income:", error);
      alert(error.response?.data?.message || "Failed to add income. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center min-h-screen px-6 sm:px-20 bg-gradient-to-br from-green-300 to-blue-500 relative gap-12">
      <button onClick={() => navigate('/income')} className="absolute top-5 left-5 bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 transition-all">
        <FaArrowLeft className="text-gray-700 text-lg" />
      </button>

      <div className='hidden sm:flex flex-col justify-between w-1/3 text-white text-lg font-light p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/15'>
        <div>
          <h3 className='text-2xl font-semibold text-white mb-4'>Track Your Income</h3>
          <p>Record your income sources and track your financial inflow efficiently.</p>
        </div>
        <div className='mt-6 space-y-3 w-full'>
          <button 
            onClick={() => navigate('/dashboard')}
            className='w-full py-3 rounded-full bg-green-600 text-white text-lg font-medium cursor-pointer hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-md'>
            Go to Dashboard
          </button>
          <button 
            onClick={() => navigate('/income')}
            className='w-full py-3 rounded-full bg-blue-600 text-white text-lg font-medium cursor-pointer hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-md'>
            View Incomes
          </button>
        </div>
      </div>

      <div className='bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full sm:w-[32rem] text-indigo-200 border border-white/20 flex flex-col items-center'>
        <h2 className='text-4xl font-bold text-white text-center mb-6 tracking-wide'>Add Income</h2>
        
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div>
            <label className="block text-white font-medium">Amount</label>
            <input
              type="number"
              step="0.01"
              min="0"
              className="w-full p-3 bg-gray-700 text-white border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
              required
            />
          </div>

          <div>
            <label className="block text-white font-medium">Source</label>
            <select
              className="w-full p-3 bg-gray-700 text-white border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              required
            >
              <option value="">Select Source</option>
              <option value="Salary">Salary</option>
              <option value="Freelancing">Freelancing</option>
              <option value="Business">Business</option>
              <option value="Investments">Investments</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className={`w-full bg-green-500 text-white py-3 rounded-lg shadow-md transition transform hover:scale-[1.02] ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"}`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Income"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddIncome;
