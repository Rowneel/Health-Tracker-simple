const mongoose = require('mongoose')

const SymptomSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date:{
        type: Date,
        required: true,
        default: Date.now
    },
    symptoms:{
        type: [String],
        required: true
    },
    severity:{
        type: Number,
        min:1,
        max:10,
        required: true
    },
    description:{
        type: String,
        maxlength: 500
    }
});

module.exports = mongoose.model('Symptom', SymptomSchema);