const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let roomModel = new Schema({
    roomId: { type: String, required: true, unique: true },
    creatorId: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    name: { type: String, required: true },
    createdOn: { type: Date, default: Date.now }
})


mongoose.model('Room', roomModel);