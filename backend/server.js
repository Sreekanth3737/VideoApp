const express = require('express')
const cors=require('cors')
require('dotenv').config()
const connectDb=require('./config/db')
const {errorHandler,notFound}=require('./middlewares/errorHandler')
const userRoutes=require('./routes/userRoutes')
const videoRoutes=require('./routes/videoRoutes')

connectDb()
const app=express()

app.use(express.json())
app.use(cors())

app.use('/api/users',userRoutes)
app.use('/api/video',videoRoutes)

//err handler
app.use(notFound)
app.use(errorHandler)

const port=process.env.PORT || 5000;
const server=app.listen(port,()=>console.log(`Server started on port ${port}`))

