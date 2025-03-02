import { useEffect, useState } from "react";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/expenses/", {
        credentials: "include", // Ensure cookies (auth token) are sent
      });
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await fetch(`http://localhost:4000/api/expenses/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      setExpenses(expenses.filter(expense => expense._id !== id)); // Update state
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Expenses</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Amount</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense._id} className="border-t">
                <td className="py-2 px-4 border">{expense.amount}</td>
                <td className="py-2 px-4 border">{expense.category}</td>
                <td className="py-2 px-4 border">{expense.description}</td>
                <td className="py-2 px-4 border">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => deleteExpense(expense._id)}
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

export default ExpenseList;
