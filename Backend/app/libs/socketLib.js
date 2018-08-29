const socketIo = require('socket.io')
const eventEmitter = require('./eventLib').eventEmitter
const tokenLib = require('./tokenLib')
const config = require('./../../config/appConfig')

let setSocketServer = function (server) {

    socketServer = socketIo.listen(server).of(config.version + '/chat')


    /**
           * @api {socket} /api/v1/chat Socket URL
           * @apiVersion 1.0.0
           * @apiGroup Chat Socket URL
           * @apiDescription This is the url where the client must make a socket connection
           * 
           *
          */


    socketServer.on('connection', (socket) => {

        console.log("A new user tried to connected")

        socket.emit('verifyUser', '')


        /**
           * @api {event}  verifyUser verifyUser
           * @apiVersion 1.0.0
           * @apiGroup Listen
           * @apiDescription This event should be listened to by the client, after this the client can then emit setUser event.
           * 
           *
          */
        socket.on('setUser', (authToken) => {
            tokenLib.verifyToken(authToken, (err, decoded) => {
                if (err) {
                    console.log("auth error")
                    socket.emit('authError', '')
                } else {
                    socket.userId = decoded.user.userId
                    socket.userName = (`${decoded.user.firstName} ${decoded.user.lastName}`).trim()
                    console.log(socket.userName + " connected to socket server")
                }
            })
        })

        /**
   * @api {event}  authError authError
   * @apiVersion 1.0.0
   * @apiGroup Listen
   * @apiDescription This event is emitted by the server if it finds that the authToken is invalid or socket is missing user detail.
   * 
   *
  */

        /**
         * @api {event}  setUser setUser
         * @apiVersion 1.0.0
         * @apiGroup Emit
         * @apiDescription This event should emitted by the client to register and set user detail to the socket connection. With out this the server will not identify the user as valid user.
         * 
         *
        */


        socket.on('joinRoom', (roomId) => {

            if (socket.roomId != roomId) {

                //leave the current room if any
                if (socket.roomId) {
                    socket.to(socket.roomId).broadcast.emit('userLeft', socket.userName)
                    socket.leave(socket.roomId)
                }
                //join room
                socket.roomId = roomId
                socket.join(roomId)
                socket.to(socket.roomId).broadcast.emit('userJoin', socket.userName)
            }

        })


        /**
          * @api {event}  joinRoom joinRoom
          * @apiVersion 1.0.0
          * @apiGroup Emit
          * @apiDescription This event is to be emitted by the client with the roomId when it wants to join a room. Note, if the user is already in another room than he will be forced to leave that room.
          *    *
         */

        /**
   * @api {event}  userJoin userJoin
   * @apiVersion 1.0.0
   * @apiGroup Listen
   * @apiDescription This event is emitted by the server to notify the sockets that are in the joined room about the new user joining.
   *    *
  */

        /**
      * @api {event}  userLeft userLeft
      * @apiVersion 1.0.0
      * @apiGroup Listen
      * @apiDescription This event is emitted by the server to notify the sockets that are in the room about the user leaving.
      */

        socket.on('leaveRoom', () => {

            if (socket.roomId) {
                socket.to(socket.roomId).broadcast.emit('userLeft', socket.userName)
                socket.leave(socket.roomId)
                socket.roomId = undefined
            }

        })

        /**
           * @api {event}  leaveRoom leaveRoom
           * @apiVersion 1.0.0
           * @apiGroup Emit
           * @apiDescription This event is to be emitted by the client when it wants to leave current room. If no room is joined then nothing will happen.
           *    
          */


        socket.on('newChat', (message) => {

            if (socket.roomId && socket.userId) {
                socket.to(socket.roomId).broadcast.emit('newChat', { message: message, senderId: socket.userId, senderName: socket.userName, createdOn: Date.now() })
                eventEmitter.emit('saveChat', socket.userId, socket.userName, socket.roomId, message)
            } else if (!socket.roomId) {
                socket.emit("notInARoom", '')
            } else {
                socket.emit("authError", '')
            }

        })


        /**
   * @api {event}  newChat newChat
   * @apiVersion 1.0.0
   * @apiGroup Emit
   * @apiDescription This event can be emitted by the client when it wants to send a message to current room. The emitted event must have the message string.
   *    
  */

        /**
         * @api {event}  newChat newChat
         * @apiVersion 1.0.0
         * @apiGroup Listen
         * @apiDescription This event can be emitted by the server when a user sends a message to current room. The emitted event has the chat object.
         * 
         * @apiSuccessExample {json} Event Parameter:
                 { message: "This is a new message", senderId: "f5d694", senderName: "Ekant Chawla", createdOn: "2018-08-13T08:24:31.339Z" }
            *    
        */

        /**
         * @api {event}  notInARoom notInARoom
         * @apiVersion 1.0.0
         * @apiGroup Listen
         * @apiDescription This event can be emitted by the server when a user sends a message while it is not in a room. This event will occur only if front-end is not implemeted correctly.
         *       
        */


        socket.on('typing', () => {
            if (socket.roomId && socket.userId) {
                socket.to(socket.roomId).broadcast.emit('typing', socket.userName)
            } else if (!socket.roomId) {
                socket.emit("notInARoom", '')
            } else {
                socket.emit("authError", '')
            }
        })

        /**
     * @api {event}  typing typing
     * @apiVersion 1.0.0
     * @apiGroup Emit
     * @apiDescription This event can be emitted by the client when the user is typing a message.
     *       
    */

        /**
         * @api {event}  typing typing
         * @apiVersion 1.0.0
         * @apiGroup Listen
         * @apiDescription This event is emitted by the server when a user is typing a message to everyone else in the same room as the user.
         *       
        */


        eventEmitter.on('roomNameUpdated', (roomId, name) => {

            if (socket.roomId == roomId) {
                socket.emit('roomNameUpdated', name)
            }

        })


        /**
         * @api {event}  roomNameUpdated roomNameUpdated
         * @apiVersion 1.0.0
         * @apiGroup Listen
         * @apiDescription This event is emitted by the server when a room creator updates the name of the room to all the members of the room.
         *       
        */




        //event for when the room is deleted or deactivated
        eventEmitter.on('roomRemoved', (roomId) => {

            if (socket.roomId == roomId) {
                socket.emit('roomRemoved', '')
                socket.leave(socket.roomId)
                socket.roomId = undefined
            }

        })

        /**
    * @api {event}  roomRemoved roomRemoved
    * @apiVersion 1.0.0
    * @apiGroup Listen
    * @apiDescription This event is emitted by the server when a room creator deletes or deactivates the room to all the members of the room.
    *       
   */


        socket.on('disconnect', () => {

            //if user in a room then leave that room before disconnecting
            if (socket.roomId) {
                socket.to(socket.roomId).broadcast.emit('userLeft', socket.userName)
                socket.leave(socket.roomId)
            }

        })



    }) // on connection ends

    //when any changes in the room list occur this event will notify all the sockets connected to the server.
    eventEmitter.on('roomListUpdated', () => {
        socketServer.emit('roomListUpdated', '')
    })

    /**
  * @api {event}  roomListUpdated roomListUpdated
  * @apiVersion 1.0.0
  * @apiGroup Listen
  * @apiDescription This event is emitted by the server whenever the room list is updated. This event is triggered when a new room is created, a room is renamed, a room is closed, opened or deleted.
  *       
 */



}

module.exports = {
    setSocketServer: setSocketServer
}