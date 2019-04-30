const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const TeacherRoute = require('./teachersRoute');
const subjectRoute = require('./subjectRoute');
const port = process.env.PORT|| 2004;
const path = require('path');


const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/school_db').then(()=>{
    console.log("we have successfully connected to mongo db")
}).catch((err)=>{
    console.log("failed to connect to mongo db " + err);
})

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

app.use('/teachers', TeacherRoute);
app.use('/subject', subjectRoute)

app.listen(port).on('listening', ()=>{
    console.log("our server listening on port 2004");
})