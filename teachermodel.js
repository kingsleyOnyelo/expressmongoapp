const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


    bcrypt.hash('myPassword', 10, function(err, hash) {
      // Store hash in database
    });

const teacherSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },

    last_name:{
        type: String,
        required: true
    },

    gender:{
        type : String,
        required: true
    },
    age:{
        type: Number
    },

    class:{
        type: String,
        required: true
    },

    email:{
        type : String,
        unique: true,
        required: true,
        lowercase: true
    },

    password:{
        type: String,
        required: true,
        select: false
    }
});


/* teacherSchema.method.generateHash = ()=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
} */

const teacherModel = mongoose.model('teacher', teacherSchema);

module.exports = teacherModel;