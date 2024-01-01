import express from 'express'
import Joi from 'joi'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Coder } from '../models/Coder.js'
import { authorize } from '../../middlewares/auth/authorize.middleware.js'
import { roles } from '../../middlewares/auth/roles.js'

const codersRouter = express.Router();

codersRouter.get('/', async (req, res, next) => {
  res.json({
    coders: await Coder.find({})
  })
});

codersRouter.post("/register", async (req, res) => {
  const data = req.body
  const validator = Joi.object({
    coder_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })

  const validationResult = validator.validate(data)
  if (!validationResult.error) {
    const { coder_name, email, password } = req.body
    const salt = await bcrypt.genSalt(parseInt(process.env.ROUNDS | 10));
    const hashPassowrd = await bcrypt.hash(password, salt)
    try {
      await Coder.create({
        coder_name: coder_name,
        email: email,
        password: hashPassowrd
      })
      res.json({
        status: "success",
        message: "coder created"
      })
    } catch (e) {
      console.error(e)
      res.status(500).json({
        status: "error",
        message: "Couldn't create the coder"
      })
    }
  } else {
    res.status(400).json({
      status: "error",
      message: "validation error"
    })
  }
})


codersRouter.post("/login", async (req, res) => {
  const data = req.body
  const validator = Joi.object({
    coder_name: Joi.string().required(),
    password: Joi.string().required()
  })

  const validationResult = validator.validate(data)
  if (!validationResult.error) {
    const { coder_name, password } = req.body
    const coder = await Coder.findOne({ coder_name: coder_name }).exec()
    if (!coder) {
      return res.status(404).json({
        status: "error",
        message: `No coder of coder_name ${coder_name} was found`
      })

    }

    // coder found
    // 1. Compare password
    console.log(coder)
    const passwordDoesMatch = await bcrypt.compare(password, coder.password)
    if (!passwordDoesMatch) {
      return res.status(401).json({
        status: "error",
        message: "Password is incorrect"
      })
    }

    // 2. Generate toke with role
    const token = jwt.sign({
      id: coder._id,
      coder_name: coder_name,
      role: roles.Coder
    }, process.env.JWT_SECRET | 'secret', {
      expiresIn: 36000
    })

    // 3. Send token
    return res.json({
      status: "success",
      token
    })
  } else {
    res.status(401).json({
      status: "error",
      message: "validation error"
    })
  }
})


codersRouter.get("/test", authorize([roles.Coder, roles.Manager]), (req, res) => {
  res.json("allowed!!")
})

export default codersRouter;