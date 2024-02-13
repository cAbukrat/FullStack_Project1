const express = require('express')
const cors = require('cors')
const loadDbRouter = require('./routers/loadDbRouter')
const membersRouter = require('./routers/membersRouter')
const moviesRouter = require('./routers/moviesRouter')
const subscriptionsRouter = require('./routers/subscriptionsRouter')
const connectDB = require('./configs/db')

const app = express()
const port = 8000;

connectDB()

app.use(express.json())
app.use(cors())


app.use('/', loadDbRouter)
app.use('/members', membersRouter)
app.use('/movies', moviesRouter)
app.use('/subscriptions', subscriptionsRouter)

app.listen(port, () => {
    console.log(`app is listening at http://localhost:${port}`);
});
