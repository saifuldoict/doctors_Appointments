// src/components/AdminLoginForm.js

import React, { useState, useContext} from 'react';
import {AdminContext} from '../context/AdminContext.jsx';
import axios from 'axios'
import { toast } from 'react-toastify';
const AdminLoginForm = () => {
  const [state, setState]= useState('Admin')
  const {setAToken, backendUrl} = useContext(AdminContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (state === 'Admin') {
      const {data} = await axios.post(backendUrl + '/api/admin/login',{email,password})
        if (data.success){
          localStorage.setItem('aToken',data.token)
          setAToken(data.token)
        }
        else{
          toast.error(data.message)
        }
      }else {

      }

    }catch (error) {

    }
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <p className='text-2xl font-semibold m-auto text-center'><span className='text-sky-500'>{state}</span>Login</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Login
          </button>
          {
            state === 'Admin'
            ? <p>Doctor Login <span className='text-sky-500 cursor-pointer underline' onClick={()=>setState('Doctor')}>CLick here</span></p>
            : <p>Admin Login <span className='text-sky-500 cursor-pointer underline' onClick={()=>setState('Admin')}>Click here</span></p>
          }

        </form>
      </div>
    </div>
  );
};

export default AdminLoginForm;