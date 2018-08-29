const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userModel = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, default: '' },
    userId: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    signUpDate: { type: Date, default: Date.now },
    email: { type: String, required: true },
    passwordResetToken:{type:String,default:''}
})


mongoose.model('User', userModel);