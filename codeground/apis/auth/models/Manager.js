
import mongoose from 'mongoose'
const ManagerSchema = new mongoose.Schema({
    manager_name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    epertise: {
        type: [String],
        default: undefined
    }

}, {
    collection: "managers"
})


export const Manager = mongoose.model("Manager", ManagerSchema)
