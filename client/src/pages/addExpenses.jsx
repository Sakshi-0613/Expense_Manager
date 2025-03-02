import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import { FaMoneyBillWave, FaCalendarAlt, FaTags, FaPencilAlt, FaArrowLeft } from 'react-icons/fa';

const AddExpense = () => {
    const { backendUrl, userData } = useContext(AppContent);
    const [expense, setExpense] = useState({
        description: '',
        amount: '',
        category: '',
        date: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setExpense({ ...expense, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!expense.description || !expense.amount || !expense.category || !expense.date) {
            toast.error("All fields are required!");
            return;
        }
    
        const expenseData = {
            userId: userData?.userId,
            ...expense
        };
    
        try {
            await axios.post(`${backendUrl}/api/expenses/add`, expenseData, { withCredentials: true });
            toast.success("Expense added successfully!");

        } catch (error) {
            console.error("Error adding expense:", error.response?.data);
            toast.error(error.response?.data?.error || "Failed to add expense");
        }
    };
    
    return (
        <div className='flex flex-col sm:flex-row items-center justify-center min-h-screen px-6 sm:px-20 bg-gradient-to-br from-blue-200 to-purple-400 relative gap-12'>
            {/* Floating Back Button */}
            <button onClick={() => navigate('/')} className="absolute top-5 left-5 bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 transition-all">
                <FaArrowLeft className="text-gray-900 text-lg" />
            </button>

            {/* Illustration or Summary Section */}
            <div className='hidden sm:flex flex-col justify-between w-1/3 text-white text-lg font-light p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/15'>
                <div>
                    <h3 className='text-2xl font-semibold text-white mb-4'>Track Your Expenses Smartly</h3>
                    <p>Maintain a clear record of your spending, set budgeting goals, and make better financial decisions.</p>
                </div>
                {/* Navigation Buttons */}
                <div className='mt-6 space-y-3 w-full'>
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className='w-full py-3 rounded-full bg-green-600 text-white text-lg font-medium cursor-pointer hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-md'>
                        Go to Dashboard
                    </button>
                    <button 
                        onClick={() => navigate('/expenses')}
                        className='w-full py-3 rounded-full bg-blue-600 text-white text-lg font-medium cursor-pointer hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-md'>
                        Show Expenses
                    </button>
                </div>
            </div>

            {/* Form Section */}
            <div className='bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full sm:w-[28rem] text-indigo-200 border border-white/20 flex flex-col items-center'>
                <h2 className='text-4xl font-bold text-white text-center mb-6 tracking-wide'>Add Expense</h2>
                
                <form onSubmit={handleSubmit} className='space-y-6 w-full'>
                    {/* Description Input */}
                    <div className='flex items-center gap-4 w-full px-6 py-4 rounded-xl bg-white/15 shadow-lg border border-white/15 transition-all hover:scale-[1.02]'>
                        <FaPencilAlt className="text-white text-lg" />
                        <input 
                            type='text' 
                            name='description' 
                            value={expense.description} 
                            onChange={handleChange} 
                            className='bg-transparent outline-none w-full text-white placeholder-gray-900 text-lg' 
                            placeholder='Description' 
                            required
                        />
                    </div>

                    {/* Amount Input */}
                    <div className='flex items-center gap-4 w-full px-6 py-4 rounded-xl bg-white/15 shadow-lg border border-white/15 transition-all hover:scale-[1.02]'>
                        <FaMoneyBillWave className="text-green-400 text-lg" />
                        <input 
                            type='number' 
                            name='amount' 
                            value={expense.amount} 
                            onChange={handleChange} 
                            className='bg-transparent outline-none w-full text-white placeholder-gray-900 text-lg' 
                            placeholder='Amount' 
                            required
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div className='flex items-center gap-4 w-full px-6 py-4 rounded-xl bg-white/15 shadow-lg border border-white/15 transition-all hover:scale-[1.02]'>
                        <FaTags className="text-yellow-300 text-lg" />
                        <select 
                            name='category' 
                            value={expense.category} 
                            onChange={handleChange} 
                            className='bg-transparent outline-none w-full text-white placeholder-gray-300 text-lg'
                            required
                        >
                            <option value='' className='text-gray-400'>Select Category</option>
                            <option value='Food' className='text-black'>🍔 Food</option>
                            <option value='Transport'className='text-black'>🚕 Transport</option>
                            <option value='Entertainment' className='text-black'>🎬 Entertainment</option>
                            <option value='Health' className='text-black'>💊 Health</option>
                            <option value='Other' className='text-black'>📦 Other</option>
                        </select>
                    </div>

                    {/* Date Input */}
                    <div className='flex items-center gap-4 w-full px-6 py-4 rounded-xl bg-white/15 shadow-lg border border-white/15 transition-all hover:scale-[1.02]'>
                        <FaCalendarAlt className="text-blue-300 text-lg" />
                        <input 
                            type='date' 
                            name='date' 
                            value={expense.date} 
                            onChange={handleChange} 
                            className='bg-transparent outline-none w-full text-white text-lg' 
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        type='submit' 
                        className='w-full py-4 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white text-lg font-medium cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg'>
                        Add Expense
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddExpense;
