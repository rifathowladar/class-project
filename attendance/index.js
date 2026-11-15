require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const registerControl = require('./controller/registerControl');
const loginControl = require('./controller/loginControl');
const attenControl = require('./controller/attenControl');
const attenUpdate = require('./controller/attenUpdate');

app.use(express.json())

let port = process.env.PORT || 8000
mongoose.connect(process.env.MONGO_URI).then(()=>{console.log('connected')})



app.post('/registration' ,registerControl)
app.post('/login' ,loginControl)
app.post('/attendance/:id', attenControl);
app.post('/attend-update/:id/:attendanceId', attenUpdate); 


app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})