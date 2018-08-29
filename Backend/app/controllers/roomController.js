const mongoose = require('mongoose')
const logger = require('./../libs/loggerLib')
const response = require('./../libs/responseLib')
const shortId = require('short-id')
const eventEmitter = require('./../libs/eventLib').eventEmitter

const Room = mongoose.model('Room')

//a helper function to save chat
let createRoom = function (req, res) {

    if (req.body.name) {

        let room = new Room({
            roomId: shortId.generate(),
            creatorId: req.user.userId,
            name: req.body.name
        })

        room.save((err, result) => {
            if (err) {
                logger.error(err.message, 'Room Contoller: Create Room', 5)
                let apiResponse
                if (err.name = "ValidationError") {
                    apiResponse = response.generate(true, err.message, 403, null)

                } else {
                    apiResponse = response.generate(true, 'Internal server error', 500, null)
                }
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Room created', 200, null)
                res.send(apiResponse)
                eventEmitter.emit('roomListUpdated')
            }
        })

    } else {
        let apiResponse = response.generate(true, 'Room name is missing', 403, null)
        res.send(apiResponse)

    }
}

let listRooms = function (req, res) {

    Room.find()
        .or([{ creatorId: req.user.userId }, { isActive: true }]) // return rooms that are active or are created by this user.
        .select("-_id -__v -createdOn")
        .sort("-isActive")
        .exec((err, result) => {
            if (err) {
                logger.error(err.message, 'Room Controller: listRooms')
                let apiResponse = response.generate(true, 'Internal server error', 500, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Room list found', 200, result)
                res.send(apiResponse)
            }
        })

}

let updateRoom = function (req, res) {
    if (req.body.name && req.body.roomId) {

        Room.updateOne({ creatorId: req.user.userId, roomId: req.body.roomId }, { name: req.body.name })
            .exec((err, result) => {
                if (err) {
                    logger.error(err.message, 'Room Controller: updateRoom')
                    let apiResponse = response.generate(true, 'Updation failed', 500, null)
                    res.send(apiResponse)
                } else if (result.n == 1) {
                    let apiResponse = response.generate(false, 'Name updated', 200, null)
                    res.send(apiResponse)
                    eventEmitter.emit('roomListUpdated')
                    eventEmitter.emit('roomNameUpdated', req.body.roomId, req.body.name)
                } else {
                    let apiResponse = response.generate(true, 'No such room or unauthorized updation', 404, null)
                    res.send(apiResponse)
                }
            })
    } else {
        let apiResponse = response.generate(true, 'Name and room id are required', 403, null)
        res.send(apiResponse)
    }

}

let deactivateRoom = function (req, res) {
    if (req.body.roomId) {

        Room.updateOne({ creatorId: req.user.userId, roomId: req.body.roomId }, { isActive: false })
            .exec((err, result) => {
                if (err) {
                    logger.error(err.message, 'Room Controller: deactivateRoom')

                    let apiResponse = response.generate(true, 'Deactivation failed', 500, null)
                    res.send(apiResponse)
                } else if (result.n == 1) {
                    let apiResponse = response.generate(false, 'Room deactivated', 200, null)
                    res.send(apiResponse)
                    eventEmitter.emit('roomListUpdated')
                    eventEmitter.emit('roomRemoved', req.body.roomId)
                } else {
                    let apiResponse = response.generate(true, 'No such room or unauthorized deactivation', 404, result)
                    res.send(apiResponse)
                }
            })
    } else {
        let apiResponse = response.generate(true, 'Room id is required', 403, null)
        res.send(apiResponse)
    }

}


let activateRoom = function (req, res) {
    if (req.body.roomId) {

        Room.updateOne({ creatorId: req.user.userId, roomId: req.body.roomId }, { isActive: true })
            .exec((err, result) => {
                if (err) {
                    logger.error(err.message, 'Room Controller: activateRoom')
                    let apiResponse = response.generate(true, 'Activation failed', 500, null)
                    res.send(apiResponse)
                } else if (result.n == 1) {
                    let apiResponse = response.generate(false, 'Room activated', 200, null)
                    res.send(apiResponse)
                    eventEmitter.emit('roomListUpdated')
                } else {
                    let apiResponse = response.generate(true, 'No such room or unauthorized activation', 404, null)
                    res.send(apiResponse)
                }
            })
    } else {
        let apiResponse = response.generate(true, 'Room id is required', 403, null)
        res.send(apiResponse)
    }

}



let deleteRoom = function (req, res) {
    if (req.body.roomId) {

        Room.deleteOne({ creatorId: req.user.userId, roomId: req.body.roomId })
            .exec((err, result) => {
                if (err) {
                    logger.error(err.message, 'Room Controller: deleteRoom')
                    let apiResponse = response.generate(true, 'Deletion failed', 500, null)
                    res.send(apiResponse)
                } else if (result.n == 1) {
                    let apiResponse = response.generate(false, 'Room deleted', 200, null)
                    res.send(apiResponse)
                    eventEmitter.emit('roomRemoved', req.body.roomId)
                    eventEmitter.emit('roomListUpdated')
                } else {
                    let apiResponse = response.generate(true, 'No such room or unauthorized deletion', 404, null)
                    res.send(apiResponse)
                }
            })
    } else {
        let apiResponse = response.generate(true, 'Room id is required', 403, null)
        res.send(apiResponse)
    }

}



module.exports = {
    createRoom: createRoom,
    updateRoom: updateRoom,
    deleteRoom: deleteRoom,
    deactivateRoom: deactivateRoom,
    activateRoom: activateRoom,
    listRooms: listRooms
}