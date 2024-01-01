import { grade } from "../services/grading.service.js"

export const submitController = async (req, res) => {
    const submission = req.body
    // Grade the submission
    const {code, data} = await grade(submission)
    return res.status(code).json(data);
}