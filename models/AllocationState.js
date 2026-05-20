import mongoose from "mongoose"

const allocationStateSchema = new mongoose.Schema({

    serviceType: {
        type: String,
        unique: true
    },

    lastIndex: {
        type: Number,
        default: 0
    }

})

const AllocationState =
    mongoose.models.AllocationState ||
    mongoose.model("AllocationState", allocationStateSchema)

export default AllocationState