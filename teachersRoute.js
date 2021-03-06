const teacherModel = require('./teachermodel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const env = require('./env');




router.post('/', async (req, res)=>{

    try {
       req.body.password = await bcrypt.hash(req.body.password, 10);
       const teacher = await teacherModel.create(req.body);

       const result = teacher.toJSON();
       delete result.password;

       const token =jwt.sign({id: teacher.id}, env.jwt_secret, {expiresIn: '2h'});

       res.status(200).json({
           status: 'success',
           data : {teacher: result, token}
       });
   } catch (error) {
       console.log(error);


       res.status(500).json({
           status: 'error',
           message: 'An error occured sorry'
       })
   }

});


router.get('/profile', async (req, res)=>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader) return res.status(404).json({status: "error", message:"please specify a header"});

        const token = authHeader.split(' ')[1];

        const tokenData = jwt.verify(token, env.jwt_secret);

        const teacher = await teacherModel.findById(tokenData.id);
       res.json({
            status: "success",
            data: teacher
        });

        res.json({tokenData});

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.post('/login', async (req, res)=>{
    try {
        const teacher = await teacherModel.findOne({email:req.body.email}, '+password');

        if(!teacher) return res.status(401).json({status: "error", message: "Invalid login detials"});

        const ispassword = await bcrypt.compare(req.body.password, teacher.password);
       

        if(!ispassword) return res.json({status: 'error', message:"invalid login detials"});

        const token = jwt.sign({id: teacher.id}, env.jwt_secret);

        res.json({status: "success",data: {token}});


    } catch (error) {
        
    }
});

router.put('/:email', async (req, res)=>{
    try {
        const updateTeachers = await teacherModel.findByIdAndUpdate
        ({email: req.params.email}, req.body, {new:true})
        res.json({
            status: "success",
            data: updateTeachers
        })
        
    } catch (error) {
        console.log(error);


        res.status(404).json({
            status: 'error',
            message: 'An error occured while trying to update teacher data'
        })
    }
})


router.delete('/:email', async(req, res)=>{
    try {
        const deleteTeacher = await teacherModel.findOneAndDelete
        ({email: req.params.email}, req.body, {new: true});
        if(!deleteTeacher){
            res.json({
                status:"error",
                message:"sorry you cannot delete a teacher that does not exist"
            })
        }

        res.json({
            status:"succces",
            data: deleteTeacher
        })
    } catch (error) {
        console.log(error);


        res.status(404).json({
            status: 'error',
            message: 'An error occured while trying to delete a teacher'
        })
    }
})


router.get('/', async (req, res)=>{
    const search = req.query.name ? {gender: req.query.name} : {};
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


router.get('/:email', async (req, res)=>{
    const email = req.params.email;
    try {
        const emailFind = await teacherModel.findOne({email: email});
        res.status(200).json({
            status: "success",
            data: emailFind
        })
    } catch (error) {
        res.json({
            status: error,
            message: 'failed to generate list by email'
        })
    }
})

module.exports = router;