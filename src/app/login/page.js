"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react'

export default function page() {
    const [formData, setFormData] = useState({
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
            const response = await axios.post("/api/auth/login", formData, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if(response.status === 200){
                alert("User login SuccessFully");
                console.log(response.data);

                // Store tokens in local storage
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("refreshToken", response.data.refreshToken);

                router.push("/profile");
            }
            else {
                alert(response.data.error || "Login failed");
            }
        } catch (error) {
            console.log(error);
            alert("Error logging in user");
        }
    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
            <h1 className='text-2xl font-semibold text-center text-gray-800 mb-4'>Login</h1>


            <form className='space-y-4' onSubmit={handleSubmit}>
                <div>
                    <label className='block text-gray-700 font-medium mb-1'>Email</label>
                    <input type="email" placeholder='Enter your email' className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' name='email' value={formData.email} onChange={handleChange}/>
                </div>

                <div>
                    <label className='block text-gray-700 font-medium mb-1'>Password</label>
                    <input type="password" placeholder='Enter your password' className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' name='password' value={formData.password} onChange={handleChange}/>
                </div>

                <div>
                    <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200'>Login</button>
                </div>
            </form>
        </div>
    </div>
  )
}

// {
//     "email" : "Nia123@gmail.com",
//     "password" : "nia123"
// }