const express = require('express')
const chatController = require('./../controllers/chatController');
const roomController = require('./../controllers/roomController');

const config = require('./../../config/appConfig')
const routeMiddleware = require('./../middlewares/routeMiddleware');



let setRoutes = function (app) {
    let baseUrl = config.version + "/room"

    app.post(baseUrl + '/chatlist', routeMiddleware.verifyAuthToken, chatController.listChat);

    /**
     * @api {post} /api/v1/room/chatlist List chat
     * @apiVersion 1.0.0
     * @apiGroup Read
     * @apiDescription This api provides list of chat message objects. It takes the user's authToken and the room's id to list the chat.
     *
     * @apiParam {string} authToken Auth token of user
     * @apiParam {string} roomId Id of an active room
     *  
     *@apiSuccess {object} response  Shows error status, message, http status code, result/data and unix timestamp
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
     *  "error": false,
        "message": "Messages found",
        "status": 200,
        "data": [
            {              
                "senderId": "f5d694",
                "senderName": "Ekant",
                "message": "my first message",
                "createdOn": "2018-08-13T08:23:24.047Z",
            },
            {
                "senderId": "f5d694",
                "senderName": "Ekant",
                "message": "my second message",
                "createdOn": "2018-08-13T08:24:07.060Z",
            },
            {
                "senderId": "f5d694",
                "senderName": "Ekant",
                "message": "my third message",
                "createdOn": "2018-08-13T08:24:31.339Z",
            }
        ],
        "timestamp": 1535436103345
    }
        
    * @apiErrorExample {json} Error-Response:
    * {
        "error": true,
        "message": "internal server error",
        "status": 500,
        "data": null,
        "timestamp": 1535436103345
       }
    */

    app.post(baseUrl + '/create', routeMiddleware.verifyAuthToken, roomController.createRoom);
    /**
     * @api {post} /api/v1/room/create Create room
     * @apiVersion 1.0.0
     * @apiGroup Create
     * @apiDescription This api should be used for creating a new room.
     *
     * @apiParam {string} authToken Auth token of user
     * @apiParam {string} name Name of the room to be created
     *  
     *@apiSuccess {object} response  Shows error status, message, http status code, result/data and unix timestamp. data field is kept to maintain the standard response structure
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
    "error": false,
    "message": "Room created",
    "status": 200,
    "data": null,
    "timestamp": 1535437576480
}
        
    * @apiErrorExample {json} Error-Response:
    * {
        "error": true,
        "message": "internal server error",
        "status": 500,
        "data": null,
        "timestamp": 1535436103345
       }
    */




    app.post(baseUrl + '/update', routeMiddleware.verifyAuthToken, roomController.updateRoom);

    /**
   * @api {post} /api/v1/room/update Update room name
   * @apiVersion 1.0.0
   * @apiGroup Update
   * @apiDescription This api should be used for updating an existing room's name.
   *
   * @apiParam {string} authToken Auth token of user
   * @apiParam {string} name New name of the room
   * @apiParam {string} roomId Id of the room to be updated
   *  
   *@apiSuccess {object} response  Shows error status, message, http status code, result/data and unix timestamp. data field is kept to maintain the standard response structure
   * 
   *  @apiSuccessExample {json} Success-Response:
   *  {
  "error": false,
  "message": "Name updated",
  "status": 200,
  "data": null,
  "timestamp": 1535437576480
}
      
  * @apiErrorExample {json} Error-Response:
  * {
      "error": true,
      "message": "internal server error",
      "status": 500,
      "data": null,
      "timestamp": 1535436103345
     }
  */







    app.post(baseUrl + '/deactivate', routeMiddleware.verifyAuthToken, roomController.deactivateRoom);


    /**
     * @api {post} /api/v1/room/deactivate Close room
     * @apiVersion 1.0.0
     * @apiGroup Update
     * @apiDescription This api should be used for making a room inactive.
     *
     * @apiParam {string} authToken Auth token of user
     * @apiParam {string} roomId Id of the room to be updated
     *  
     *@apiSuccess {object} response  Shows error status, message, http status code, result/data and unix timestamp. data field is kept to maintain the standard response structure
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
    "error": false,
    "message": "Room deactivated",
    "status": 200,
    "data": null,
    "timestamp": 1535437576480
}
        
    * @apiErrorExample {json} Error-Response:
    * {
        "error": true,
        "message": "internal server error",
        "status": 500,
        "data": null,
        "timestamp": 1535436103345
       }
    */







    app.post(baseUrl + '/activate', routeMiddleware.verifyAuthToken, roomController.activateRoom);

    /**
         * @api {post} /api/v1/room/activate Open room
         * @apiVersion 1.0.0
         * @apiGroup Update
         * @apiDescription This api should be used for making a room active.
         *
         * @apiParam {string} authToken Auth token of user
         * @apiParam {string} roomId Id of the room to be updated
         *  
         *@apiSuccess {object} response  Shows error status, message, http status code, result/data and unix timestamp. data field is kept to maintain the standard response structure
         * 
         *  @apiSuccessExample {json} Success-Response:
         *  {
        "error": false,
        "message": "Room activated",
        "status": 200,
        "data": null,
        "timestamp": 1535437576480
    }
            
        * @apiErrorExample {json} Error-Response:
        * {
            "error": true,
            "message": "internal server error",
            "status": 500,
            "data": null,
            "timestamp": 1535436103345
           }
        */







    app.post(baseUrl + '/delete', routeMiddleware.verifyAuthToken, roomController.deleteRoom);

    /**
     * @api {post} /api/v1/room/delete Delete room
     * @apiVersion 1.0.0
     * @apiGroup Delete
     * @apiDescription This api should be used for removing the room permanently.
     *
     * @apiParam {string} authToken Auth token of user
     * @apiParam {string} roomId Id of the room to be updated
     *  
     *@apiSuccess {object} response  Shows error status, message, http status code, result/data and unix timestamp. data field is kept to maintain the standard response structure
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
    "error": false,
    "message": "Room deleted",
    "status": 200,
    "data": null,
    "timestamp": 1535437576480
}
        
    * @apiErrorExample {json} Error-Response:
    * {
        "error": true,
        "message": "internal server error",
        "status": 500,
        "data": null,
        "timestamp": 1535436103345
       }
    */



    app.post(baseUrl + '/list', routeMiddleware.verifyAuthToken, roomController.listRooms);

    /**
     * @api {post} /api/v1/room/delete List room
     * @apiVersion 1.0.0
     * @apiGroup Delete
     * @apiDescription This api should be used for getting the list of rooms.
     *
     * @apiParam {string} authToken Auth token of user
     * 
     *  
     *@apiSuccess {object} response  Shows error status, message, http status code, result/data and unix timestamp. data will contain an array of rooms which are either active or created by the user(authToken)
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
    "error": false,
    "message": "Room list found",
    "status": 200,
    "data": [
        {
            "isActive": true,
            "roomId": "eb3b48",
            "creatorId": "78a863",
            "name": "My Room"
        },
        {
            "isActive": true,
            "roomId": "eed239",
            "creatorId": "f5d694",
            "name": "My Room1"
        },
        {
            "isActive": false,
            "roomId": "2ce050",
            "creatorId": "f5d694",
            "name": "A new room"
        }
    ],
    "timestamp": 1535438173982
}
        
    * @apiErrorExample {json} Error-Response:
    * {
        "error": true,
        "message": "internal server error",
        "status": 500,
        "data": null,
        "timestamp": 1535436103345
       }
    */




}


module.exports = {
    setRoutes: setRoutes
}
