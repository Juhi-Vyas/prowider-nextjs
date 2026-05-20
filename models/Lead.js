import mongoose from "mongoose"

const leadSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    serviceType: {
        type: String,
        required: true
    },

    description: {
        type: String
    }

}, {
    timestamps: true
})

leadSchema.index(
    { phone: 1, serviceType: 1 },
    { unique: true }
)

const Lead =
    mongoose.models.Lead ||
    mongoose.model("Lead", leadSchema)

export default Lead