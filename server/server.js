const express = require("express")
const app = express()
const cors = require('cors');
const db = require("./models")
require('dotenv').config();
const createHttpError = require('http-errors')
const PORT = 2001

// middleware ///
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());


// routes///
const authRouter = require('./router/auth.router')
app.use('/api/auth', authRouter)

// admin router 
const adminRouter = require('./router/admin.router')
app.use('/admin', adminRouter)

const userroute = require('./router/user.router')
app.use('/api/user', userroute)

app.get('/lll', (req, res) => {
    res.send("postmak")
})

app.use((req, res, next) => {
    next(createHttpError.NotFound());
});

app.use((error, req, res, next) => {
    error.status = error.status || 500;
    res.status(error.status)
    res.send(error);
});

app.listen(PORT, () => {
    console.log(`Server started at 🚀 http://localhost:${PORT}`)
})


