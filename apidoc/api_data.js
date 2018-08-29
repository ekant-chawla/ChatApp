define({ "api": [
  {
    "type": "post",
    "url": "/api/v1/room/create",
    "title": "Create room",
    "version": "1.0.0",
    "group": "Create",
    "description": "<p>This api should be used for creating a new room.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Auth token of user</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the room to be created</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "response",
            "description": "<p>Shows error status, message, http status code, result/data and unix timestamp. data field is kept to maintain the standard response structure</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Room created\",\n    \"status\": 200,\n    \"data\": null,\n    \"timestamp\": 1535437576480\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n        \"error\": true,\n        \"message\": \"internal server error\",\n        \"status\": 500,\n        \"data\": null,\n        \"timestamp\": 1535436103345\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/chatAndRoomRoutes.js",
    "groupTitle": "Create",
    "name": "PostApiV1RoomCreate"
  },
  {
    "type": "post",
    "url": "/api/v1/user/signup",
    "title": "Signup",
    "version": "1.0.0",
    "group": "Create",
    "description": "<p>Signup new user with a valid email id and password. Passowrd must be at least 8 characters.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-mail id of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last name of the user (Optional)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"User registered successfully.\",\n    \"status\": 200,\n    \"data\": null,\n    \"timestamp\": 1535440227612\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n        \"error\": true,\n        \"message\": \"internal server error\",\n        \"status\": 500,\n        \"data\": null\n        \"timestamp\": 1535440227612\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userRoutes.js",
    "groupTitle": "Create",
    "name": "PostApiV1UserSignup"
  },
  {
    "type": "post",
    "url": "/api/v1/room/delete",
    "title": "Delete room",
    "version": "1.0.0",
    "group": "Delete",
    "description": "<p>This api should be used for removing the room permanently.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Auth token of user</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "roomId",
            "description": "<p>Id of the room to be updated</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "response",
            "description": "<p>Shows error status, message, http status code, result/data and unix timestamp. data field is kept to maintain the standard response structure</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Room deleted\",\n    \"status\": 200,\n    \"data\": null,\n    \"timestamp\": 1535437576480\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n        \"error\": true,\n        \"message\": \"internal server error\",\n        \"status\": 500,\n        \"data\": null,\n        \"timestamp\": 1535436103345\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/chatAndRoomRoutes.js",
    "groupTitle": "Delete",
    "name": "PostApiV1RoomDelete"
  },
  {
    "type": "post",
    "url": "/api/v1/room/delete",
    "title": "List room",
    "version": "1.0.0",
    "group": "Delete",
    "description": "<p>This api should be used for getting the list of rooms.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Auth token of user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "response",
            "description": "<p>Shows error status, message, http status code, result/data and unix timestamp. data will contain an array of rooms which are either active or created by the user(authToken)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Room list found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"isActive\": true,\n            \"roomId\": \"eb3b48\",\n            \"creatorId\": \"78a863\",\n            \"name\": \"My Room\"\n        },\n        {\n            \"isActive\": true,\n            \"roomId\": \"eed239\",\n            \"creatorId\": \"f5d694\",\n            \"name\": \"My Room1\"\n        },\n        {\n            \"isActive\": false,\n            \"roomId\": \"2ce050\",\n            \"creatorId\": \"f5d694\",\n            \"name\": \"A new room\"\n        }\n    ],\n    \"timestamp\": 1535438173982\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n        \"error\": true,\n        \"message\": \"internal server error\",\n        \"status\": 500,\n        \"data\": null,\n        \"timestamp\": 1535436103345\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/chatAndRoomRoutes.js",
    "groupTitle": "Delete",
    "name": "PostApiV1RoomDelete"
  },
  {
    "type": "post",
    "url": "/api/v1/room/chatlist",
    "title": "List chat",
    "version": "1.0.0",
    "group": "Read",
    "description": "<p>This api provides list of chat message objects. It takes the user's authToken and the room's id to list the chat.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Auth token of user</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "roomId",
            "description": "<p>Id of an active room</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "response",
            "description": "<p>Shows error status, message, http status code, result/data and unix timestamp</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n       \"message\": \"Messages found\",\n       \"status\": 200,\n       \"data\": [\n           {              \n               \"senderId\": \"f5d694\",\n               \"senderName\": \"Ekant\",\n               \"message\": \"my first message\",\n               \"createdOn\": \"2018-08-13T08:23:24.047Z\",\n           },\n           {\n               \"senderId\": \"f5d694\",\n               \"senderName\": \"Ekant\",\n               \"message\": \"my second message\",\n               \"createdOn\": \"2018-08-13T08:24:07.060Z\",\n           },\n           {\n               \"senderId\": \"f5d694\",\n               \"senderName\": \"Ekant\",\n               \"message\": \"my third message\",\n               \"createdOn\": \"2018-08-13T08:24:31.339Z\",\n           }\n       ],\n       \"timestamp\": 1535436103345\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n        \"error\": true,\n        \"message\": \"internal server error\",\n        \"status\": 500,\n        \"data\": null,\n        \"timestamp\": 1535436103345\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/chatAndRoomRoutes.js",
    "groupTitle": "Read",
    "name": "PostApiV1RoomChatlist"
  },
  {
    "type": "post",
    "url": "/api/v1/user/login",
    "title": "Login",
    "version": "1.0.0",
    "group": "Read",
    "description": "<p>The login api of the application. Used to obtain the authToken for all other api.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-mail id of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"User logged in\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Imxhc3ROYW1lIjoiIiwiZW1haWwiOiJla2FudC5jaGF3bGExQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IkVrYW50IiwidXNlcklkIjoiZjVkNjk0In0sImV4cCI6MTUzNTUyMjQwOSwic3ViIjoiQXV0aFRva2VuIiwiaXNzIjoiQ2hhdEFwcCIsImlhdCI6MTUzNTQzNjAwOH0.q8TClbik4JhW1R75Q1wnNdCyznuGRUivHR1ZbI7B8Iw\",\n        \"userId\": \"f5d694\",\n        \"firstName\": \"Ekant\",\n        \"lastName\": \"\"\n    },\n    \"timestamp\": 1535436008861\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n        \"error\": true,\n        \"message\": \"internal server error\",\n        \"status\": 500,\n        \"data\": null\n        \"timestamp\": 1535440227612\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userRoutes.js",
    "groupTitle": "Read",
    "name": "PostApiV1UserLogin"
  },
  {
    "type": "post",
    "url": "/api/v1/room/activate",
    "title": "Open room",
    "version": "1.0.0",
    "group": "Update",
    "description": "<p>This api should be used for making a room active.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Auth token of user</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "roomId",
            "description": "<p>Id of the room to be updated</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "response",
            "description": "<p>Shows error status, message, http status code, result/data and unix timestamp. data field is kept to maintain the standard response structure</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n       \"error\": false,\n       \"message\": \"Room activated\",\n       \"status\": 200,\n       \"data\": null,\n       \"timestamp\": 1535437576480\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n            \"error\": true,\n            \"message\": \"internal server error\",\n            \"status\": 500,\n            \"data\": null,\n            \"timestamp\": 1535436103345\n           }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/chatAndRoomRoutes.js",
    "groupTitle": "Update",
    "name": "PostApiV1RoomActivate"
  },
  {
    "type": "post",
    "url": "/api/v1/room/deactivate",
    "title": "Close room",
    "version": "1.0.0",
    "group": "Update",
    "description": "<p>This api should be used for making a room inactive.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Auth token of user</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "roomId",
            "description": "<p>Id of the room to be updated</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "response",
            "description": "<p>Shows error status, message, http status code, result/data and unix timestamp. data field is kept to maintain the standard response structure</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Room deactivated\",\n    \"status\": 200,\n    \"data\": null,\n    \"timestamp\": 1535437576480\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n        \"error\": true,\n        \"message\": \"internal server error\",\n        \"status\": 500,\n        \"data\": null,\n        \"timestamp\": 1535436103345\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/chatAndRoomRoutes.js",
    "groupTitle": "Update",
    "name": "PostApiV1RoomDeactivate"
  },
  {
    "type": "post",
    "url": "/api/v1/room/update",
    "title": "Update room name",
    "version": "1.0.0",
    "group": "Update",
    "description": "<p>This api should be used for updating an existing room's name.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Auth token of user</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>New name of the room</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "roomId",
            "description": "<p>Id of the room to be updated</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "response",
            "description": "<p>Shows error status, message, http status code, result/data and unix timestamp. data field is kept to maintain the standard response structure</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n  \"error\": false,\n  \"message\": \"Name updated\",\n  \"status\": 200,\n  \"data\": null,\n  \"timestamp\": 1535437576480\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n      \"error\": true,\n      \"message\": \"internal server error\",\n      \"status\": 500,\n      \"data\": null,\n      \"timestamp\": 1535436103345\n     }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/chatAndRoomRoutes.js",
    "groupTitle": "Update",
    "name": "PostApiV1RoomUpdate"
  },
  {
    "type": "post",
    "url": "/api/v1/user/forgotPass",
    "title": "Password reset",
    "version": "1.0.0",
    "group": "Update",
    "description": "<p>Send password reset email to the user on the registered email id.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Registered email of the user</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n \"error\": false,\n \"message\": \"Password reset email sent.\",\n \"status\": 200,\n \"data\": null,\n \"timestamp\": 1535436008861\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"internal server error\",\n     \"status\": 500,\n     \"data\": null\n     \"timestamp\": 1535440227612\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userRoutes.js",
    "groupTitle": "Update",
    "name": "PostApiV1UserForgotpass"
  },
  {
    "type": "post",
    "url": "/api/v1/user/updatePass",
    "title": "Update password",
    "version": "1.0.0",
    "group": "Update",
    "description": "<p>Reset the password of the user using the password reset url.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>Password reset auth token provided at the end of the password reset url</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>New password of the user</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Password updated\",\n    \"status\": 200,\n    \"data\": null,\n    \"timestamp\": 1535436008861\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n        \"error\": true,\n        \"message\": \"internal server error\",\n        \"status\": 500,\n        \"data\": null\n        \"timestamp\": 1535440227612\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userRoutes.js",
    "groupTitle": "Update",
    "name": "PostApiV1UserUpdatepass"
  }
] });
