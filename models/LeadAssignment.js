import mongoose from "mongoose"

const leadAssignmentSchema = new mongoose.Schema({

    leadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lead"
    },

    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Provider"
    }

}, {
    timestamps: true
})

const LeadAssignment =
    mongoose.models.LeadAssignment ||
    mongoose.model("LeadAssignment", leadAssignmentSchema)

export default LeadAssignment