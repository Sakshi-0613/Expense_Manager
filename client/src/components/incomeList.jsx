import { useEffect, useState, useContext } from "react";
import { AppContent } from "../context/AppContext";
import axios from "axios";

const IncomeList = () => {
  const { backendUrl, userData } = useContext(AppContent);
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/income/`, {
        params: { userId: userData.userId },
      });
      setIncomes(response.data);
    } catch (error) {
      console.error("Error fetching incomes:", error);
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/income/delete/${id}`);
      setIncomes(incomes.filter(income => income._id !== id));
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h3 className="text-xl text-gray-900 font-bold mb-4">Your Income</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border text-gray-900">Amount</th>
              <th className="py-2 px-4 border text-gray-900">Source</th>
              <th className="py-2 px-4 border text-gray-900">Date</th>
              <th className="py-2 px-4 border text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {incomes.map((income) => (
              <tr key={income._id} className="border-t">
                <td className="py-2 px-4 border text-gray-800">${income.amount}</td>
                <td className="py-2 px-4 border text-gray-800">{income.source}</td>
                <td className="py-2 px-4 border text-gray-800">
                  {new Date(income.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => deleteIncome(income._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncomeList;
