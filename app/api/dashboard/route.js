import { connectDB } from "../../../lib/db"

import Provider from "../../../models/Provider"

import LeadAssignment from "../../../models/LeadAssignment"

import Lead from "../../../models/Lead"

export async function GET() {

    try {

        await connectDB()

        const providers = await Provider.find()

        const dashboardData = []

        for (const provider of providers) {

            const assignments =
                await LeadAssignment.find({
                    providerId: provider._id
                })

            const leadIds =
                assignments.map(
                    item => item.leadId
                )

            const leads =
                await Lead.find({
                    _id: { $in: leadIds }
                })

            dashboardData.push({

                providerName: provider.name,

                remainingQuota:
                    provider.monthlyQuota -
                    provider.leadsAssigned,

                leadsAssigned:
                    provider.leadsAssigned,

                leads

            })

        }

        return Response.json({
            success: true,
            dashboardData
        })

    } catch (error) {

        return Response.json({
            success: false,
            message: error.message
        })

    }

}