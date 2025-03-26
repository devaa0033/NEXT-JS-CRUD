"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react'

export default function page() {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [isOpen, setIsOpen] = useState(false);
    const [updatedData, setUpdatedData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const router = useRouter();


    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('accessToken')
                const response = await axios.get('/api/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
               if(response.data){
                setUserData(response.data);
               }
            } catch (error) {
                console.log("Error fetching user data:", error)
            }
        };
        fetchUserData();
    }, []);


    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logout', {}, {withCredentials: true});
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            router.push("/login");
        } catch (error) {
            console.log("Logout failed: ", error);
        }
    }


    const handleEdit = () => {
        setUpdatedData({
            username: userData.Full_Name || "",
            email: userData.Email_Address || "",
            password: ""
        });
        setIsOpen(true);
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const updatedFields = {
                Full_Name: updatedData.username,
                Email_Address: updatedData.email,
            }

            if(updatedData.password){
                updatedFields.Created_password = updatedData.password;
            }

            const res = await axios.put('/api/auth/profile',updatedFields, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            if(res.status === 200){
                setUserData(res.data);
                setIsOpen(false);
            }
        } catch (error) {
            console.log("Error updating user data:", error);
        }
    }

    const handleDeleteAccount = async () => {
        if(!confirm("Are you sure you want to delete your account? This action is irreversible." )){
            return ;
        }

        try {
            const token = localStorage.getItem("accessToken");
            const res = await axios.delete("/api/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if(res.status === 200){
                alert("Account deleted successfully");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                router.push("/register");
            }
        } catch (error) {
            console.error("Error deleting account : ", error);
            alert("Failed to delete account.");
        }
    };

  return ( 
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">

            <div className="flex justify-end px-4 pt-4">
                <button
                    onClick={toggleDropdown}
                    className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                    type="button">
                    <span className="sr-only">Open dropdown</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 3" >
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                </button>
                {isDropdownOpen && (
                <div className="absolute z-10 top-85 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-md w-44 dark:bg-gray-700">
                    <ul className="py-2">
                        <li>
                            <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={handleDeleteAccount}>
                                Delete Account
                            </button>
                        </li>
                    </ul>
                </div>
            )}
            </div>
            
            <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg" alt=""/>
                {userData ? (
                    <>
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userData.Full_Name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{userData.Email_Address}</span>
                <div className="flex mt-4 md:mt-6">
                    <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleLogout}>Logout</button>
                
                    <button onClick={handleEdit} className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Update</button>
                </div>
            </>
             )  :   (
                    <p>Loading....</p>
                )}
            </div>
        </div>





       { /*Modal*/}

       {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
                <h2 className='text-xl font-bold mb-4'>Edit Profile</h2>

                <input type="text" name="username" value={updatedData.username || ""} onChange={(e) => setUpdatedData({...updatedData, username: e.target.value})} placeholder='New Username' className='w-full p-2 border rounded mb-3' />

                <input type="email" name="email" value={updatedData.email || ""} onChange={(e) => setUpdatedData({...updatedData, email: e.target.value})} placeholder='New Email' className='w-full p-2 border rounded mb-3' />

                <input type="password" name="password" value={updatedData.password || ""} onChange={(e) => setUpdatedData({...updatedData, password: e.target.value})} placeholder='New Password' className='w-full p-2 border rounded mb-3' />

                <div className="flex justify-end">
                    <button className='px-4 py-2 mr-2 bg-gray-300 rounded' onClick={() => setIsOpen(false)}>Cancel</button>
                    <button className='px-4 py-2 bg-blue-600 text-white rounded' onClick={handleUpdate}>Update</button>
                </div>

            </div>
       </div>
    ) }

 </div>
  )
}


// {
//   "username" : "Sarah",
//   "email" : "sarah123@gmail.com", -> sarah456@gmail.com
//   "password" : "sarah123" -> sarah456
// }
