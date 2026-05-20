"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"

function Page() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    serviceType: "",
    description: "",
  });

  const router = useRouter()

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

        const response =
            await fetch("/api/leads", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(formData)

            })

        const data =
            await response.json()

        console.log(data)

        if (data.success) {

            router.push("/dashboard")

        }

    } catch (error) {

        console.log(error)

    }

}

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        
        <h1 className="text-3xl font-bold text-black text-center mb-7">
          Request Service
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black placeholder:text-gray-500 font-medium outline-none focus:border-black"
          />

          <input
            type="text"
            name="phone"
            placeholder="Enter Phone"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black placeholder:text-gray-500 font-medium outline-none focus:border-black"
          />

          <input
            type="text"
            name="city"
            placeholder="Enter City"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black placeholder:text-gray-500 font-medium outline-none focus:border-black"
          />

          <select
            name="serviceType"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black font-medium outline-none focus:border-black bg-white"
          >
            <option value="">Select Service</option>
            <option value="Service 1">Service 1</option>
            <option value="Service 2">Service 2</option>
            <option value="Service 3">Service 3</option>
          </select>

          <textarea
            name="description"
            placeholder="Enter Description"
            rows="4"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black placeholder:text-gray-500 font-medium outline-none focus:border-black resize-none"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-semibold text-lg hover:bg-gray-900 transition-all duration-200"
          >
            Submit
          </button>

        </form>
      </div>
    </div>
  );
}

export default Page;