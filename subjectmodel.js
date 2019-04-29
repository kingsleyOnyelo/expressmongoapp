const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    class:{
        type: String,
        required: true
    },
    project:{
        type: String,
        required:true
    },
    student:{
        type: String,
        required: true
    }

});

const SubjectModel = mongoose.model('subject', subjectSchema);
module.exports = SubjectModel;