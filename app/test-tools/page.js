"use client"

export default function TestTools() {

    // RESET QUOTA WEBHOOK

    const resetQuota = async () => {

        try {

            const response =
                await fetch("/api/webhook", {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        eventId: "payment_123"
                    })

                })

            const data =
                await response.json()

            alert(data.message)

        } catch (error) {

            console.log(error)

        }

    }

    // GENERATE 10 LEADS

    const generateLeads = async () => {

        try {

            const requests = []

            for (let i = 0; i < 10; i++) {

                requests.push(

                    fetch("/api/leads", {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            name:
                                `User ${i}`,

                            phone:
                                `99999${Date.now()}${i}`,

                            city:
                                "Delhi",

                            serviceType:
                                "Service 1",

                            description:
                                "Bulk Test"

                        })

                    })

                )

            }

            await Promise.all(requests)

            alert("10 Leads Generated")

        } catch (error) {

            console.log(error)

        }

    }

    return (

        <div className="p-10">

            <h1 className="text-4xl font-bold mb-8">
                Test Tools
            </h1>

            <div className="flex gap-5">

                <button
                    onClick={resetQuota}
                    className="
                    bg-black
                    text-white
                    px-5
                    py-3
                    rounded
                    "
                >
                    Reset Provider Quota
                </button>

                <button
                    onClick={generateLeads}
                    className="
                    bg-blue-500
                    text-white
                    px-5
                    py-3
                    rounded
                    "
                >
                    Generate 10 Leads
                </button>

            </div>

        </div>

    )

}