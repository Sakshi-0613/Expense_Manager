import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/login'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Expenses from './pages/Expenses'
import AddExpense from './pages/AddExpenses'
import Dashboard from './pages/Dashboard'
import AddIncome from './pages/addIncome'
import Income from './pages/income'

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/email-verify' element = {<EmailVerify/>}/>
        <Route path='/reset-password' element = {<ResetPassword/>}/>
         <Route path="/" element={<Home />} /> 
        <Route path="/expenses" element={<Expenses/>} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-income" element={<AddIncome />} /> {/* ✅ Route Added */}
        <Route path="/income" element={<Income />} /> {/* ✅ Route Added */}
        
        

      </Routes>
    </div>
  )
}

export default App
