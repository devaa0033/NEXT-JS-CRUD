"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/register', formData);

      if (response.status === 201) {
        alert("User registered successfully");
        router.push("/login");
      } else {
        alert(response.data.error || "Registration failed");
      }
    } catch (error) {
      console.log(error);
      alert("Error registering user");
    }
  }


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">Register</h1>
        
       <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Username:</label>
            <input 
              type="text" 
              placeholder="Enter your username"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" name='username' value={formData.username} onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email:</label>
            <input 
              type="email" 
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" name='email' value={formData.email} onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password:</label>
            <input 
              type="password" 
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" name='password' value={formData.password} onChange={handleChange}
            />
          </div>

          <div>
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


// {
//   "username" : "Maya",
//   "email" : "maya123@gmail.com",
//   "password" : "maya123"
// }

