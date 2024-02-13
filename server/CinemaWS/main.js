const express = require('express')
const cors = require('cors')
const connectDB = require('./configs/db')
const usersRouter = require('./routers/usersRouter')
const moviesRouter = require('./routers/moviesRouter')
const membersRouter = require('./routers/membersRouter')
const subscriptionsRouter = require('./routers/subscriptionsRouter')
const authRouter = require('./routers/authRouter')

const app = express()
const port = 8080;

connectDB();
app.use(cors())
app.use(express.json())

//routers
app.use('/users', usersRouter)
app.use('/movies', moviesRouter)
app.use('/members', membersRouter)
app.use('/subscriptions', subscriptionsRouter)
app.use('/auth', authRouter)

app.listen(port, () => {
    console.log(`app is listening at http://localhost:${port}`);
})