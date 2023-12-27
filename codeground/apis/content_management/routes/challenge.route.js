import express from 'express'
import { getAll, createChallenge, getChallengeById, getChallengeTestsById, getChallengesByCategorie } from '../controllers/challenge.controller.js';


const contentRouter = express.Router();
contentRouter.get("/", getAll)
contentRouter.post("/create", createChallenge)
contentRouter.get("/:id", getChallengeById)
contentRouter.get("/tests/:id", getChallengeTestsById)
contentRouter.get("/category/:category", getChallengesByCategorie)

export default contentRouter;