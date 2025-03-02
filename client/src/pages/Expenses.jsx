import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTrash } from 'react-icons/fa';

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/api/expenses/');
                setExpenses(data);
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to load expenses');
            } finally {
                setLoading(false);
            }
        };

        fetchExpenses(); 
    }, []); 

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/expenses/${id}`, { withCredentials: true });
            setExpenses(expenses.filter(expense => expense._id !== id)); 
            toast.success("Expense deleted successfully!");
        } catch (error) {
            console.error("Error deleting expense:", error);
            toast.error("Failed to delete expense.");
        }
    };

    return (
        <div className='flex flex-col sm:flex-row items-center justify-center min-h-screen px-6 sm:px-20 bg-gradient-to-br from-blue-200 to-purple-400 relative gap-12'>
            {/* Floating Back Button */}
            <button onClick={() => navigate('/')} className="absolute top-5 left-5 bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 transition-all">
                <FaArrowLeft className="text-gray-700 text-lg" />
            </button>

            {/* Navigation & Description Section */}
            <div className='hidden sm:flex flex-col justify-between w-1/3 text-white text-lg font-light p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/15'>
                <div>
                    <h3 className='text-2xl font-semibold text-white mb-4'>Your Expense History</h3>
                    <p>Review your past expenses, track spending patterns, and manage your finances effectively.</p>
                </div>
                <div className='mt-6 space-y-3 w-full'>
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className='w-full py-3 rounded-full bg-green-600 text-white text-lg font-medium cursor-pointer hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-md'>
                        Go to Dashboard
                    </button>
                    <button 
                        onClick={() => navigate('/add-expense')}
                        className='w-full py-3 rounded-full bg-indigo-600 text-white text-lg font-medium cursor-pointer hover:bg-indigo-700 hover:scale-105 transition-all duration-300 shadow-md'>
                        + Add Expense
                    </button>
                </div>
            </div>

            {/* Expenses List Section */}
            <div className='bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full sm:w-[32rem] text-indigo-200 border border-white/20 flex flex-col items-center'>
                <h2 className='text-4xl font-bold text-white text-center mb-6 tracking-wide'>Your Expenses</h2>
                
                {loading ? (
                    <p className='text-center text-gray-400 py-4'>Loading...</p>
                ) : (
                    expenses.length > 0 ? (
                        <div className='bg-[#333A5C] p-5 rounded-lg shadow-md w-full'>
                            <div className='max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800'>
                                {expenses.map((expense) => (
                                    <div key={expense._id} className='flex justify-between items-center p-4 border-b border-gray-700 hover:bg-gray-800 transition-all rounded-md'>
                                        <span className='text-gray-300'>{expense.description}</span>
                                        <span className='text-green-400 font-medium'>${expense.amount}</span>
                                        <button 
                                            onClick={() => deleteExpense(expense._id)}
                                            className="ml-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition">
                                            <FaTrash />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-col items-center text-gray-400 text-center py-10'>
                            <p className='text-lg font-medium'>No expenses yet!</p>
                            <p className='text-sm mb-4'>Start tracking your expenses to manage your finances better.</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Expenses;
