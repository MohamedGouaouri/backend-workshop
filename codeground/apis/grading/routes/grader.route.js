import express from 'express'
import { submitController } from '../controllers/submit.controller.js'
const gradingRouter = express.Router()

gradingRouter.post('/submit', submitController) // TODO: Add validator
// gradingRouter.get('/leaderboard', leaderboardController)

export default gradingRouter;