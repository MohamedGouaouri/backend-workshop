import express from 'express'
export const router = express.Router();

const admins = []
router.get('/', (req, res) => {
    res.json(admins)
})

export default router