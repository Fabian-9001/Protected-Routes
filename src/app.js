const express = require('express')
const app = express()
const db = require('./utils/database')
const port = require('../config').api.port
const userRouter = require('./users/users.router')
const postLogin = require('./auth/auth.router')


/*DATABASE*/
db.authenticate()
    .then(() => console.log('Database Authenticated'))
    .catch((err) => console.log(err))

db.sync()
    .then(() => console.log('Database Synced'))
    .catch((err) => console.log(err))

app.use(express.json())


/*ROUTES*/
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Ok!' })
})

app.use('/auth', postLogin)
app.use('/api/v1/users', userRouter)


/*SERVER*/
app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})