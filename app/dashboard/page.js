"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [providers, setProviders] = useState([]);

  const fetchDashboard = async () => {
    try {
      const response = await fetch("/api/dashboard");

      const data = await response.json();

      setProviders(data.dashboardData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    fetchDashboard()

    const interval =
        setInterval(() => {

            fetchDashboard()

        }, 3000)

    return () => clearInterval(interval)

}, [])

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-6 md:p-10">
      
      <h1 className="text-3xl md:text-4xl font-bold text-black mb-8">
        Provider Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {providers.map((provider, index) => (
          
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
          >
            
            <div className="flex items-center justify-between mb-5">
              
              <h2 className="text-2xl font-bold text-black">
                {provider.providerName}
              </h2>

              <span className="bg-black text-white text-sm px-3 py-1 rounded-full">
                {provider.remainingQuota} Left
              </span>

            </div>

            <div className="space-y-2 text-[15px] text-gray-700 font-medium">
              
              <p>
                Leads Assigned:{" "}
                <span className="text-black font-semibold">
                  {provider.leadsAssigned}
                </span>
              </p>

              <p>
                Remaining Quota:{" "}
                <span className="text-black font-semibold">
                  {provider.remainingQuota}
                </span>
              </p>

            </div>

            <div className="mt-6">
              
              <h3 className="text-lg font-semibold text-black mb-4">
                Assigned Leads
              </h3>

              <div className="space-y-3">
                
                {provider.leads.map((lead) => (
                  
                  <div
                    key={lead._id}
                    className="border border-gray-200 rounded-xl p-4 bg-gray-50"
                  >
                    
                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-semibold text-black">
                        Name:
                      </span>{" "}
                      {lead.name}
                    </p>

                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-semibold text-black">
                        Phone:
                      </span>{" "}
                      {lead.phone}
                    </p>

                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-black">
                        Service:
                      </span>{" "}
                      {lead.serviceType}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}