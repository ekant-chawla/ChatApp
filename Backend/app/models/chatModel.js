const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let chatModel = new Schema({
    roomId: { type: String, required: true },
    senderId: { type: String, required: true },
    senderName: { type: String, required: true },
    message: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
})


mongoose.model('Chat', chatModel);