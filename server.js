const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const TeacherRoute = require('./teachersRoute');
const env = require('./env');



const app = express();

mongoose.connect(env.mongodb_url).then(()=>{
    console.log("we have successfully connected to mongo db")
}).catch((err)=>{
    console.log("failed to connect to mongo db " + err);
})

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('/teachers', TeacherRoute);

app.listen(env.port).on('listening', ()=>{
    console.log("our server listening on port 2004");
})