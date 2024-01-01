import express from 'express'
import codersRouter from './coders.route.js';
import managersRouter from './managers.route.js';

const authRouter = express.Router();

authRouter.use('/coders', codersRouter);
authRouter.use('/managers', managersRouter);

export default authRouter