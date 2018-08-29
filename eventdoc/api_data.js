define({ "api": [
  {
    "type": "socket",
    "url": "/api/v1/chat",
    "title": "Socket URL",
    "version": "1.0.0",
    "group": "Chat_Socket_URL",
    "description": "<p>This is the url where the client must make a socket connection</p>",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Chat_Socket_URL",
    "name": "SocketApiV1Chat"
  },
  {
    "type": "event",
    "url": "joinRoom",
    "title": "joinRoom",
    "version": "1.0.0",
    "group": "Emit",
    "description": "<p>This event is to be emitted by the client with the roomId when it wants to join a room. Note, if the user is already in another room than he will be forced to leave that room. *</p>",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Emit",
    "name": "EventJoinroom"
  },
  {
    "type": "event",
    "url": "leaveRoom",
    "title": "leaveRoom",
    "version": "1.0.0",
    "group": "Emit",
    "description": "<p>This event is to be emitted by the client when it wants to leave current room. If no room is joined then nothing will happen.</p>",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Emit",
    "name": "EventLeaveroom"
  },
  {
    "type": "event",
    "url": "newChat",
    "title": "newChat",
    "version": "1.0.0",
    "group": "Emit",
    "description": "<p>This event can be emitted by the client when it wants to send a message to current room. The emitted event must have the message string.</p>",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Emit",
    "name": "EventNewchat"
  },
  {
    "type": "event",
    "url": "setUser",
    "title": "setUser",
    "version": "1.0.0",
    "group": "Emit",
    "description": "<p>This event should emitted by the client to register and set user detail to the socket connection. With out this the server will not identify the user as valid user.</p>",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Emit",
    "name": "EventSetuser"
  },
  {
    "type": "event",
    "url": "typing",
    "title": "typing",
    "version": "1.0.0",
    "group": "Emit",
    "description": "<p>This event can be emitted by the client when the user is typing a message.</p>",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Emit",
    "name": "EventTyping"
  },
  {
    "type": "event",
    "url": "authError",
    "title": "authError",
    "version": "1.0.0",
    "group": "Listen",
    "description": "<p>This event is emitted by the server if it finds that the authToken is invalid or socket is missing user detail.</p>",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Listen",
    "name": "EventAutherror"
  },
  {
    "type": "event",
    "url": "newChat",
    "title": "newChat",
    "version": "1.0.0",
    "group": "Listen",
    "description": "<p>This event can be emitted by the server when a user sends a message to current room. The emitted event has the chat object.</p>",
    "success": {
      "examples": [
        {
          "title": "Event Parameter:",
          "content": "{ message: \"This is a new message\", senderId: \"f5d694\", senderName: \"Ekant Chawla\", createdOn: \"2018-08-13T08:24:31.339Z\" }",
          "type": "json"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Listen",
    "name": "EventNewchat"
  },
  {
    "type": "event",
    "url": "notInARoom",
    "title": "notInARoom",
    "version": "1.0.0",
    "group": "Listen",
    "description": "<p>This event can be emitted by the server when a user sends a message while it is not in a room. This event will occur only if front-end is not implemeted correctly.</p>",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Listen",
    "name": "EventNotinaroom"
  },
  {
    "type": "event",
    "url": "roomListUpdated",
    "title": "roomListUpdated",
    "version": "1.0.0",
    "group": "Listen",
    "description": "<p>This event is emitted by the server whenever the room list is updated. This event is triggered when a new room is created, a room is renamed, a room is closed, opened or deleted.</p>",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Listen",
    "name": "EventRoomlistupdated"
  },
  {
    "type": "event",
    "url": "roomNameUpdated",
    "title": "roomNameUpdated",
    "version": "1.0.0",
    "group": "Listen",
    "description": "<p>This event is emitted by the server when a room creator updates the name of the room to all the members of the room.</p>",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Listen",
    "name": "EventRoomnameupdated"
  },
  {
    "type": "event",
    "url": "roomRemoved",
    "title": "roomRemoved",
    "version": "1.0.0",
    "group": "Listen",
    "description": "<p>This event is emitted by the server when a room creator deletes or deactivates the room to all the members of the room.</p>",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Listen",
    "name": "EventRoomremoved"
  },
  {
    "type": "event",
    "url": "typing",
    "title": "typing",
    "version": "1.0.0",
    "group": "Listen",
    "description": "<p>This event is emitted by the server when a user is typing a message to everyone else in the same room as the user.</p>",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Listen",
    "name": "EventTyping"
  },
  {
    "type": "event",
    "url": "userJoin",
    "title": "userJoin",
    "version": "1.0.0",
    "group": "Listen",
    "description": "<p>This event is emitted by the server to notify the sockets that are in the joined room about the new user joining. *</p>",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Listen",
    "name": "EventUserjoin"
  },
  {
    "type": "event",
    "url": "userLeft",
    "title": "userLeft",
    "version": "1.0.0",
    "group": "Listen",
    "description": "<p>This event is emitted by the server to notify the sockets that are in the room about the user leaving.</p>",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Listen",
    "name": "EventUserleft"
  },
  {
    "type": "event",
    "url": "verifyUser",
    "title": "verifyUser",
    "version": "1.0.0",
    "group": "Listen",
    "description": "<p>This event should be listened to by the client, after this the client can then emit setUser event.</p>",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Listen",
    "name": "EventVerifyuser"
  }
] });
