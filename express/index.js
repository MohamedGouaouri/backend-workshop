import express from 'express'
import { v4 } from 'uuid'
// Instantiate your express app
const app = express()

// Add json middleware
app.use(express.json())

// Define http handlers
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    res.send('Hello world')
})

const users = [{
    id: v4(),
    name: 'Mohammed',
    age: 23,
}]

app.get('/users', (req, res) => {
    res.json(users)
})

// Posting data
app.post('/users/add', (req, res) => {
    const user = req.body
    users.push({
        id: v4(),
        ...user
    });
    return res.status(201).json({
        added: true
    })
})

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const user = searchForUser(users, userId);
    if (user) {
        return res.json(user);
    }
    return res.status(404).json({
        'error': 'User not found'
    })
})

// Listen for incoming requests
app.listen(3000, () => {
    console.log('Server is listening on port 3000')
})


function searchForUser(users, userId) {
    const filtered = users.filter((value) => value.id === userId)
    if (filtered.length > 0) {
        return filtered[0]
    }
}