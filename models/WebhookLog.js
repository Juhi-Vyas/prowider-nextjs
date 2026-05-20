import mongoose from "mongoose"

const webhookLogSchema =
    new mongoose.Schema({

        eventId: {
            type: String,
            unique: true
        },

        processedAt: {
            type: Date,
            default: Date.now
        }

    })

const WebhookLog =
    mongoose.models.WebhookLog ||
    mongoose.model(
        "WebhookLog",
        webhookLogSchema
    )

export default WebhookLog