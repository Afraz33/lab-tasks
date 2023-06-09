const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    jobTitle: {
        type: String,
        required: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
   jobTags: { 
        type: String,
        required: true,
    },
    
});


module.exports = mongoose.model("jobs", jobSchema)