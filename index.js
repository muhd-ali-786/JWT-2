const express = require('express')
const mongoose = require('mongoose')
const colors = require('colors')
require('dotenv').config()

const connectDB = require('./config/db')

connectDB()

const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : false}))



app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)

app.listen(3000, ()=> console.log('Server Started on 3000'))