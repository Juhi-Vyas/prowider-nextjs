import {connectDB} from "../../../lib/db.js"

import Provider from "../../../models/Provider.js"

export async function GET() {

    try {

        await connectDB()

        await Provider.deleteMany()

        await Provider.insertMany([

            {
                name: "Provider 1",
                services: ["Service 1", "Service 3"]
            },

            {
                name: "Provider 2",
                services: ["Service 1", "Service 3"]
            },

            {
                name: "Provider 3",
                services: ["Service 1", "Service 3"]
            },

            {
                name: "Provider 4",
                services: ["Service 1", "Service 3"]
            },

            {
                name: "Provider 5",
                services: ["Service 2", "Service 3"]
            },

            {
                name: "Provider 6",
                services: ["Service 2", "Service 3"]
            },

            {
                name: "Provider 7",
                services: ["Service 2", "Service 3"]
            },

            {
                name: "Provider 8",
                services: ["Service 2", "Service 3"]
            }

        ])

        return Response.json({
            success: true,
            message: "Providers Seeded"
        })

    } catch (error) {

        return Response.json({
            success: false,
            message: error.message
        })

    }

}