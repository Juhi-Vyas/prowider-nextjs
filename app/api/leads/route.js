import mongoose from "mongoose"

import { connectDB }
from "../../../lib/db"

import Lead
from "../../../models/Lead"

import {
    allocateProviders
}
from "../../../lib/allocationEngine"

export async function POST(req) {

    const session =
        await mongoose.startSession()

    session.startTransaction()

    try {

        await connectDB()

        const body =
            await req.json()

        // CREATE LEAD

        const leadArray =
            await Lead.create(
                [body],
                { session }
            )

        const lead = leadArray[0]

        // ALLOCATE PROVIDERS

        const assignedProviders =
            await allocateProviders(
                lead,
                session
            )

        // COMMIT

        await session.commitTransaction()

        session.endSession()

        return Response.json({

            success: true,

            lead,

            assignedProviders

        })

    } catch (error) {

        // ROLLBACK

        await session.abortTransaction()

        session.endSession()

        return Response.json({

            success: false,

            message: error.message

        })

    }

}