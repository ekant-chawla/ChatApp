const mongoose = require('mongoose')
const logger = require('./../libs/loggerLib')
const response = require('./../libs/responseLib')

const Chat = mongoose.model('Chat')
const Room = mongoose.model('Room')


//a helper function to save chat
let saveChat = function (senderId, senderName, roomId, message) {

    let chat = new Chat({
        roomId: roomId,
        senderId: senderId,
        senderName: senderName,
        message: message
    })

    chat.save((err, result) => {
        if (err) {
            logger.error(err.message, 'Chat Controller: Save Chat', 10)
        }
    })
}

// as long as the user is a valid user and the room id is valid he can access the chat history as all rooms are public anyway
let listChat = function (req, res) {

    let verifyRoom = function () {
        return new Promise((resolve, reject) => {
            if (req.body.roomId) {
                //Find if it is a valid room id and is active
                Room.findOne({ roomId: req.body.roomId, isActive: true })
                    .lean()
                    .exec((err, result) => {
                        if (err) {
                            logger.error(err.message, 'Chat Controller: List Chat', 10)
                            let apiResponse = response.generate(true, 'Internal server error', 500, null)
                            reject(apiResponse)
                        } else if (result) {       
                            resolve()
                        } else {
                            let apiResponse = response.generate(true, 'No such active room found', 404, null)
                            reject(apiResponse)
                        }
                    })
            } else {
                let apiResponse = response.generate(true, 'Room id missing', 403, null)
                reject(apiResponse)
            }
        })
    }

    let getList = function () {
        return new Promise((resolve, reject) => {

            Chat.find({ roomId: req.body.roomId })
                .select("-__v -_id -roomId")
                .sort('createdOn')
                .lean()
                .exec((err, result) => {
                    if (err) {

                        logger.error(err.message, 'Chat Controller: List Chat', 10)
                        let apiResponse = response.generate(true, 'Internal server error', 500, null)
                        reject(apiResponse)

                    } else {

                        let apiResponse = response.generate(false, 'Messages found', 200, result)
                        resolve(apiResponse)
                    }
                })
        })
    }


    verifyRoom()
        .then(getList)
        .then((response) => {
            res.send(response)
        })
        .catch((err) => {
            res.send(err);
        })

}

module.exports = {
    saveChat: saveChat,
    listChat: listChat
}