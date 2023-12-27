import express from 'express'
import {router as usersRouter} from './routes/users.routes.js'
import {router as adminsRouter} from './routes/admins.routes.js'
import logger from './middlewares/logger.js'

// Instantiate your express app
const app = express()

// Add json middleware
app.use(express.json())
app.use(logger)

// Define http handlers
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    res.send('Hello world')
})

app.use('/users', usersRouter);
app.use('/admins', adminsRouter);

// Listen for incoming requests
app.listen(3000, () => {
    console.log('Server is listening on port 3000')
})
