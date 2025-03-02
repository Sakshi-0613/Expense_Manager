import { useNavigate } from "react-router-dom";
import IncomeList from "../components/incomeList";

const Income = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center min-h-screen px-6 sm:px-20 bg-gradient-to-br from-green-300 to-blue-500 relative gap-12">
      {/* Floating Back Button */}
      <button 
        onClick={() => navigate("/")} 
        className="absolute top-5 left-5 bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 transition-all flex items-center gap-2">
        ⬅ <span className="hidden sm:inline">Back</span>
      </button>

      {/* Navigation Section */}
      <div className="hidden sm:flex flex-col justify-between w-1/3 text-white text-lg font-light p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/15">
        <div>
          <h3 className="text-3xl font-semibold text-white mb-4">Manage Your Income</h3>
          <p className="text-gray-200">Track your earnings effortlessly and maintain better financial stability.</p>
        </div>
        <div className="mt-6 space-y-4 w-full">
          <button 
            onClick={() => navigate("/dashboard")} 
            className="w-full py-3 rounded-full bg-green-600 text-white text-lg font-medium cursor-pointer hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-md">
            Go to Dashboard
          </button>
          <button 
            onClick={() => navigate("/add-income")} 
            className="w-full py-3 rounded-full bg-blue-600 text-white text-lg font-medium cursor-pointer hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-md">
            Add Income
          </button>
        </div>
      </div>

      {/* Income List Section */}
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full sm:w-[32rem] text-indigo-200 border border-white/20 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-white text-center mb-6 tracking-wide">Track Your Earnings</h2>
        <IncomeList />
      </div>
    </div>
  );
};

export default Income;
