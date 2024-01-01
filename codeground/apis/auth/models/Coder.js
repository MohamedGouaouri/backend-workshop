import mongoose from 'mongoose'


const CoderSchema = new mongoose.Schema({
    coder_name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

}, {
    collection: "coders"
})


export const Coder = mongoose.model("Coder", CoderSchema)
