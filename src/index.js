const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
require('dotenv').config()
const route = require('./routes/userRoutes')

app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(multer().any())

mongoose.connect(process.env.MONGOOSE_URL, ({useNewUrlParser : true}))
.then(()=> console.log('Connected to Mongoose server '))
.catch(err => console.error(err))

app.use('/', route)


app.listen(process.env.PORT, ()=>{
    console.log('listening on port '+process.env.PORT);
})