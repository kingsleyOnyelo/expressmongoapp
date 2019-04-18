const mongoose = require('mongoose');
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
        required: true
    }
});


const teacherModel = mongoose.model('teacher', teacherSchema);

module.exports = teacherModel;