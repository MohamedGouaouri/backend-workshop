import mongoose from 'mongoose';
const functionInputSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: false,
  }
}, { _id : false })
const testSchema = new mongoose.Schema({
  weight: { type: Number, required: true },
  inputs: [{
    name: { type: String, required: true },
    value: { type: Object, required: true }
  }],
  expected: { type: Object },

}, { timestamps: true });

const challengeSchema = new mongoose.Schema({
  name: {
    type: String, required: true,
  },
  level: {
    type: String, required: true,
  },
  categorie: {
    type: String, required: true,
  },
  language: {
    type: String,
    required: true,
  },
  description: {
    type: String, required: true
  },
  func_name: {
    type: String, require: true
  },
  inputs: [functionInputSchema],
  output: {
    type: String, require: true,
  },
  tests: [testSchema],
}, { timestamps: true });

export const Challenge = mongoose.model("challenge", challengeSchema);
