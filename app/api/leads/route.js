import { connectDB }
from "../../../lib/db"

import Lead
from "../../../models/Lead"

import {
    allocateProviders
}
from "../../../lib/allocationEngine"

export async function POST(req) {

    try {

        await connectDB()

        const body =
            await req.json()

        // CREATE LEAD

        const lead =
            await Lead.create(body)

        // ALLOCATE PROVIDERS

        const assignedProviders =
            await allocateProviders(lead)

        return Response.json({

            success: true,

            lead,

            assignedProviders

        })

    } catch (error) {

        console.log(error)

        return Response.json({

            success: false,

            message: error.message

        })

    }

}