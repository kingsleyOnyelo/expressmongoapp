const express = require('express');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./auth');

const subjectModel = require('./subjectmodel');
const router = express.Router();


const SECRET = "Lev3lup!7456";

router.post('/',authMiddleware, async (req, res)=>{
    try {
        

      const subject = await subjectModel.create({
          name: req.body.name,
          project: req.body.project,
          class: req.body.class,
          student: req.user
      });

      res.json({status:"success", data: subject});
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error",
    message: "looks like you are not a student"})
    }
});


router.get('/', authMiddleware, async(req, res)=>{
    try {
        const subjects = await subjectModel.find({project: req.user})
        res.json({
            status:"success",
            data: subjects
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "could not find subject"
        })
    }
});

module.exports = router;