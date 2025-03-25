"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function page() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        axios.get('/api/auth/profile', {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        .then(response => setUserData(response.json()))
        .then(data => setUserData(data))
        .catch(error => console.log(error));
    }, []);

  return ( 
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg" alt=""/>
                {userData ? (
                    <>
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userData.Full_Name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{userData.Email_Address}</span>
                <div className="flex mt-4 md:mt-6">
                    <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</a>
                    <a href="#" className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Update</a>
                </div>
            </>
             )  :   (
                    <p>Loading....</p>
                )}
            </div>
        </div>
        </div>
  )
}
