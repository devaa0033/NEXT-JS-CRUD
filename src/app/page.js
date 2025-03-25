"use client"

import React, { useEffect, useState } from 'react'

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
    .then(response => response.json())
    .then(data => setUsers(data))
    .catch(error => console.log(error));
    }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <table className="table-auto border-collapse border border-gray-300 shadow-lg bg-white">
      <thead>
        <tr className="bg-gray-200 text-gray-700">
          <th className="border border-gray-300 px-6 py-3">ID</th>
          <th className="border border-gray-300 px-6 py-3">Username</th>
          <th className="border border-gray-300 px-6 py-3">Email</th>
          <th className="border border-gray-300 px-6 py-3" colSpan="2">Operation</th>
        </tr>
      </thead>
      <tbody>
      {users.map ((user) => (
        <tr key = {user.id} className="hover:bg-gray-100 transition">
          <td className="border border-gray-300 px-6 py-3 text-center">{user.id}</td>
          <td className="border border-gray-300 px-6 py-3 text-center">{user.Full_Name}</td>
          <td className="border border-gray-300 px-6 py-3 text-center">{user.Email_Address}</td>
          <td className="border border-gray-300 px-6 py-3 text-center"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button></td>
          <td className="border border-gray-300 px-6 py-3 text-center"><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button></td>
        </tr>
      ))}
      </tbody>
    </table>

  </div>
 ); 
}
