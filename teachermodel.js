const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


    bcrypt.hash('myPassword', 10, function(err, hash) {
      // Store hash in database
    });

const teacherSchema = new mongoose.Schema({
    department:{
        type: String,
        required: true
    },

    name:{
        type: String,
        required: true
    },

    email:{
        type : String,
        required: true
    },
    age:{
        type: Number,
        required: false
    },

    password:{
        type: String,
        required: true,
        select: false
    }
});




const teacherModel = mongoose.model('teacher', teacherSchema);

module.exports = teacherModel;