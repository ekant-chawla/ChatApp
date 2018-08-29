const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//model to ensure that the token was created by the server and not from a stolen secret.

let authModel = new Schema({
    authToken: { type: String, required: true },
    createdOn: { type: Date, default: Date.now }
})


mongoose.model('Auth', authModel);