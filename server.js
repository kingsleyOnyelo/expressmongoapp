const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const TeacherRoute = require('./teachersRoute');
const subjectRoute = require('./subjectRoute');


const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/school_db').then(()=>{
    console.log("we have successfully connected to mongo db")
}).catch((err)=>{
    console.log("failed to connect to mongo db " + err);
})

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('/teachers', TeacherRoute);
app.use('/subject', subjectRoute)

app.listen(2004).on('listening', ()=>{
    console.log("our server listening on port 2004");
})