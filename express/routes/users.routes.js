import express from 'express'
import { v4 } from 'uuid'

/*
  This router object will have similar methods (.get, .post, .patch, .delete) to the 
  app object we have previously been using.
*/
export const router = express.Router();

const users = [{
    id: v4(),
    name: 'Mohammed',
    age: 23,
}]

router.get('/', (req, res) => {
    res.json(users)
})

// Posting data
router.post('/add', (req, res) => {
    const user = req.body
    users.push({
        id: v4(),
        ...user
    });
    return res.status(201).json({
        added: true
    })
})

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    const user = searchForUser(users, userId);
    if (user) {
        return res.json(user);
    }
    return res.status(404).json({
        'error': 'User not found'
    })
})


function searchForUser(users, userId) {
    const filtered = users.filter((value) => value.id === userId)
    if (filtered.length > 0) {
        return filtered[0]
    }
}
