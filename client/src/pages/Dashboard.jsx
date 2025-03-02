import React, { useEffect, useState, useContext } from "react";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // ✅ Back button icon

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const { backendUrl, userData } = useContext(AppContent);
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [categoryData, setCategoryData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (userData && userData.userId) {
      fetchExpenses();
      fetchIncome();
    }
  }, [userData]);

  const fetchExpenses = async () => {
    if (!userData?.userId) return;
    try {
      const { data } = await axios.get(`${backendUrl}/api/expenses`, {
        params: { userId: userData.userId },
      });
      setExpenses(data);
      setTotalExpense(data.reduce((acc, item) => acc + item.amount, 0));
      processCategoryData(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const fetchIncome = async () => {
    if (!userData?.userId) return;
    try {
      const { data } = await axios.get(`${backendUrl}/api/income`, {
        params: { userId: userData.userId },
      });
      setIncome(data);
      setTotalIncome(data.reduce((acc, item) => acc + item.amount, 0));
    } catch (error) {
      console.error("Error fetching income:", error);
    }
  };

  // Process expenses by category
  const processCategoryData = (expenses) => {
    const categoryMap = {};
    expenses.forEach((expense) => {
      categoryMap[expense.category] =
        (categoryMap[expense.category] || 0) + expense.amount;
    });

    const formattedData = Object.keys(categoryMap).map((key) => ({
      name: key,
      value: categoryMap[key],
    }));

    setCategoryData(formattedData);
  };

  const barChartData = [
    { name: "Income", amount: totalIncome, fill: "#4CAF50" },
    { name: "Expense", amount: totalExpense, fill: "#F44336" },
  ];

  const pieColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  return (
    <div className="p-6 relative">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 right-6 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition-all"
      >
        <FaArrowLeft className="text-xl" />
      </button>

      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Buttons for Adding Income & Expenses */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className="bg-teal-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-teal-700 transition-all"
          onClick={() => navigate("/add-income")}
        >
          ➕ Add Income
        </button>
        <button
          className="bg-amber-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-amber-700 transition-all"
          onClick={() => navigate("/add-expense")}
        >
          ➖ Add Expense
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Total Income</h2>
          <p className="text-xl font-bold">${totalIncome}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Total Expense</h2>
          <p className="text-xl font-bold">${totalExpense}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Total Balance</h2>
          <p className="text-xl font-bold">${totalIncome - totalExpense}</p>
        </div>
      </div>

      {/* Income vs. Expenses Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-lg font-semibold mb-4">Income vs. Expenses</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barChartData} barSize={60}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip cursor={{ fill: "#f5f5f5" }} />
            <Legend />
            <Bar dataKey="amount" animationDuration={800} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Expenses by Category Pie Chart */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Expenses by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
