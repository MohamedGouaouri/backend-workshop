import express from 'express'
import Joi from 'joi'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { roles } from '../../middlewares/auth/roles.js'
import { Manager } from '../models/Manager.js'

const managersRouter = express.Router();
/* GET managers listing. */
managersRouter.get('/', async function (req, res, next) {
    // TODO: Get managers
});

managersRouter.post("/register", async (req, res) => {
    // TODO: Register manager
})


managersRouter.post("/login", async (req, res) => {
    // TODO: Login manager
})


managersRouter.post("/add_expertise", async (req, res) => {
    // TODO: Add expertise
})
export default managersRouter;