import express from 'express'
import Joi from 'joi'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { roles } from '../../middlewares/auth/roles.js'
import { Manager } from '../models/Manager.js'

const managersRouter = express.Router();
/* GET managers listing. */
managersRouter.get('/', async function (req, res, next) {
    res.json({
        managers: await Manager.find({})
    })
});

managersRouter.post("/register", async (req, res) => {
    const data = req.body
    const validator = Joi.object({
        manager_name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        expertise: Joi.array()
    })

    const validationResult = validator.validate(data)
    if (!validationResult.error) {
        const { manager_name, email, password, expertise } = data
        const salt = await bcrypt.genSalt(parseInt(process.env.ROUNDS));
        const hashPassowrd = await bcrypt.hash(password, salt)
        try {
            let manager = await Manager.create({
                manager_name: manager_name,
                email: email,
                password: hashPassowrd,
                expertise: expertise
            })

            res.json({
                status: "success",
                message: "Manager created",
                data: manager
            })
        } catch (e) {
            console.error(e)
            res.status(500).json({
                status: "error",
                message: "Couldn't create the manager"
            })
        }
    } else {
        res.status(500).json({
            status: "error",
            message: "validation error"
        })
    }
})


managersRouter.post("/login", async (req, res) => {
    const data = req.body
    const validator = Joi.object({
        manager_name: Joi.string().required(),
        password: Joi.string().required()
    })

    const validationResult = validator.validate(data)
    if (!validationResult.error) {
        const { manager_name, password } = req.body
        const manager = await Manager.findOne({ manager_name: manager_name }).exec()
        if (!manager) {
            return res.status(401).json({
                status: "error",
                message: `No manager of manager_name ${manager_name} was found`
            })

        }

        // manager found
        // 1. Compare password
        console.log(manager)
        const passwordDoesMatch = await bcrypt.compare(password, manager.password)
        if (!passwordDoesMatch) {
            return res.status(401).json({
                status: "error",
                message: "Password is incorrect"
            })
        }

        // 2. Generate toke with role
        const token = jwt.sign({
            id: manager._id,
            username: manager_name,
            role: roles.Manager
        }, process.env.JWT_SECRET | 'secret', {
            expiresIn: 36000
        })

        // 3. Send token
        return res.json({
            status: "success",
            token
        })
    } else {
        res.status(500).json({
            status: "error",
            message: "validation error"
        })
    }
})


managersRouter.post("/add_expertise", async (req, res) => {
    const data = req.body
    const validator = Joi.object({
        email: Joi.string().email().required(),
        expertise: Joi.array()
    })

    const validationResult = validator.validate(data)
    if (!validationResult.error) {
        const { email, expertise } = data
        try {
            let manager = await Manager.findOne({ email: email })
            expertise.forEach(async (e) => {
                await Manager.updateOne({
                    _id: manager._id
                }, {
                    $push: { expertise: e }
                })
            })
            res.json({
                status: "ok",
                message: "expertise updated"
            })
        } catch (e) {
            res.status(500).json({
                status: "error",
                message: "Could not update expertise"
            })
        }

    } else {
        res.status(500).json({
            status: "error",
            message: "validation error"
        })
    }
})
export default managersRouter;