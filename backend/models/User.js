const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    email:{
        type: 'string',
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
});

UserSchema.pre("save", async function(){
    this.password = await bcrypt.hash(this.password,10);
});

module.exports = mongoose.model('User', UserSchema);