const express = require('express');
const app = express();
const mongoose = require('mongoose');
const teacherModel = require('./teachermodel');

mongoose.connect('mongodb://127.0.0.1:27017/school_db').then(()=>{
    console.log("we have successfully connected to mongo db")
}).catch((err)=>{
    console.log("failed to connect to mongo db " + err);
})

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res)=>{
    res.send("done!");
})

app.post('/teacher', async (req, res)=>{

    try {
        const teacher = await teacherModel.create(req.body);

        res.status(200).json({
            status: 'success',
            data : teacher
        });
    } catch (error) {
        console.log(error);


        res.status(404).json({
            status: 'error',
            message: 'An error occured sorry'
        })
    }

});


app.get('/teachers/', async (req, res)=>{
    const search = req.query.gender ? {gender: req.query.gender} : {};
    try {
        const teachers = await teacherModel.find(search);
        res.status(200).json({
            status: "success",
            data: teachers
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: error,
            message: "An error occured"
        })
    }
    

});

app.listen(2004).on('listening', ()=>{
    console.log("our server listening on port 2004")
})