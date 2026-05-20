import { connectDB }
from "../../../lib/db"

import Provider
from "../../../models/Provider"

import WebhookLog
from "../../../models/WebhookLog"

export async function POST(req) {

    try {

        await connectDB()

        const body = await req.json()

        const { eventId } = body

        // CHECK IDEMPOTENCY

        const alreadyProcessed =
            await WebhookLog.findOne({
                eventId
            })

        if (alreadyProcessed) {

            return Response.json({

                success: true,

                message:
                    "Webhook Already Processed"

            })

        }

        // RESET QUOTAS

        await Provider.updateMany(
            {},
            {
                monthlyQuota: 10,
                leadsAssigned: 0
            }
        )

        // SAVE WEBHOOK LOG

        await WebhookLog.create({
            eventId
        })

        return Response.json({

            success: true,

            message:
                "Quota Reset Successful"

        })

    } catch (error) {

        return Response.json({

            success: false,

            message: error.message

        })

    }

}