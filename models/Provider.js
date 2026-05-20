import mongoose from "mongoose"

const providerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    services: [{
        type: String
    }],

    monthlyQuota: {
        type: Number,
        default: 10
    },

    leadsAssigned: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
})

const Provider =
    mongoose.models.Provider ||
    mongoose.model("Provider", providerSchema)

export default Provider