import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from '../helper.service';
import * as $ from 'jquery'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [SocketService]
})
export class ChatComponent implements OnInit {

  public groupList: Array<any>
  public chatList: Array<any>
  public message: String = ''
  public typingUser: String = ''
  private listTimestamp: Number = 0
  //the room where the user is currently in
  public currentRoom

  private userId: String
  private userName: String


  /*Modal Variables*/
  public roomId  // room being used for deletion/edit
  public roomName
  public forNew: Boolean = false
  public active: String
  public saveButtonText: String

  public prevName: String
  public prevActive: String



  constructor(private _socket: SocketService, private _api: ApiService, private toastr: ToastrService, private _helper: HelperService, private _route: ActivatedRoute) { }

  ngOnInit() {
    console.log("Chat init")
    this._helper.verifyUserLoginAndReroute()

    this.userId = localStorage.getItem('userId')
    let firstName = localStorage.getItem('firstName')
    let lastName = localStorage.getItem('lastName') ? localStorage.getItem('lastName') : ''
    this.userName = firstName + lastName

    this.userName = this.userName ? this.userName.trim() : undefined

    //if user is present then do this
    if (this.userId) {
      this.getRoomList()
      this.connect()
      this.handlerError()
      this.listenForNewChat()
      this.listenToRoomListUpdated()
      this.listenToRoomNameUpdate()
      this.listenToRoomRemoved()
      this.listenToUserJoined()
      this.listenToUserLeft()
      this.listenToUserTyping()
      this.listenToNotInARoom()

      // clear the typing user every 1 sec
      setInterval(() => {
        this.typingUser = ''
      }, 1000)
    }
  }



  joinRoomFromRoute() {
    let roomId = this._route.snapshot.queryParamMap.get('join')
    console.log(roomId)
    if (roomId) {
      this.joinRoom(roomId)
    }
  }

  editRoom(roomId: String) {
    let room = this.getRoom(roomId)
    this.roomName = room.name
    this.prevName = room.name
    this.active = room.isActive ? "true" : "false"
    this.prevActive = this.active
    this.roomId = roomId
    this.forNew = false;
    this.saveButtonText = "Save Changes"

    $('#b').trigger('click')
  }


  createRoom() {
    this.roomName = ''
    this.active = "true"
    this.forNew = true;
    this.saveButtonText = "Create"

    $('#b').trigger('click')
  }

  createEditRoom() {
    if (this.forNew) {
      this.roomName = this.roomName.trim() // remove white spaces
      this._api.createRoom(this.roomName).subscribe((resp: any) => {
        if (resp.error) {
          this.toastr.error(resp.message, "Failed to create room")
        } else {
          this.toastr.success(resp.message, "Success")
        }
      })
    } else {
      if (!(this.prevActive === this.active)) {
        console.log(this.prevActive)
        console.log(this.active)
        if (this.active == "true") {

          this._api.activateRoom(this.roomId).subscribe((resp: any) => {
            if (resp.error) {
              this.toastr.error(resp.message, "Failed to activate room")
            } else {
              this.toastr.success(resp.message, "Success")
            }
          })

        } else {
          this._api.deactivateRoom(this.roomId).subscribe((resp: any) => {
            if (resp.error) {
              this.toastr.error(resp.message, "Failed to deactivate room")
            } else {
              this.toastr.success(resp.message, "Success")
            }
          })
        }
      }

      if (!(this.prevName.trim() === this.roomName.trim())) {
        this._api.renameRoom(this.roomName.trim(), this.roomId).subscribe((resp: any) => {
          if (resp.error) {
            this.toastr.error(resp.message, "Failed to update room")
          } else {
            this.toastr.success(resp.message, "Success")
          }
        })
      }
    }
  }



  //function to find room from room list based on room id
  getRoom(roomId: String): any {

    if (this.groupList) {
      for (let item of this.groupList) {
        if (item.roomId == roomId) return item
      }
    }

    return null
  }


  //Socket functions
  connect() {
    this._socket.startConnection().subscribe(() => {
      this._socket.setUser()
    })
  }

  handlerError() {
    this._socket.authError().subscribe(() => {
      console.log('Auth error occured')
      this.toastr.info("Redirecting to home", "Invalid/Expired session")
      this._helper.logout(false)
    })

  }

  joinRoom(roomId: String) {
    this.currentRoom = this.getRoom(roomId)
    if (this.currentRoom) {
      this._socket.joinRoom(roomId)
      this.toastr.info(`Joining Room: ${this.currentRoom.name}`, "Room Joined")
      this._api.listChat(this.currentRoom.roomId).subscribe((resp: any) => {
        this.chatList = resp.data
        console.log(resp.data)
      })
    } else {
      this.toastr.error("No such room.")
    }


  }

  leaveRoom() {
    if (this.currentRoom) this.toastr.info(`Leaving Room: ${this.currentRoom.name}`, "Room Left")
    this.currentRoom = null
    this._socket.leaveRoom()
    this.chatList = null
  }

  deleteRoom(roomId: String) {

    let ans = confirm("Are you sure you want to delete this room?")

    if (ans) {
      this._api.deleteRoom(roomId).subscribe((resp: any) => {
        if (resp.error) {
          this.toastr.error(resp.message, 'Failed to delete')
        } else {
          this.toastr.success(resp.message, 'Success')
        }
      })
    }
  }

  logout() {
    this.leaveRoom()
    this._helper.logout()
  }

  sendChat() {
    if (this.message.trim() != '' && this.currentRoom) {
      console.log('sending message')
      this.chatList.push({
        message: this.message,
        senderId: this.userId,
        senderName: this.userName,
        createdOn: Date.now()
      })
      console.log(this.chatList)
      this._socket.sendChat(this.message)
      this.message = ''
    }
  }


  iAmTyping() {
    this._socket.typing()
  }



  getRoomList() {
    this._api.listRooms().subscribe((resp: any) => {

      if (!resp.error && resp.timestamp > this.listTimestamp) {
        this.groupList = resp.data
        this.listTimestamp = resp.timestamp
        this.joinRoomFromRoute() // now that we have room list we can join a room if it is provided in path
      } else if (resp.error) {
        this.toastr.error('Failed to load group list. Refresh page')
      }
    })
  }



  listenToUserJoined() {
    this._socket.userJoin().subscribe((name: String) => {
      this.toastr.info(`${name} joined`)
    })
  }


  listenToUserLeft() {
    this._socket.userLeft().subscribe((name: String) => {
      this.toastr.info(`${name} left`)
    })
  }

  listenForNewChat() {
    this._socket.newChat().subscribe((chatObj) => {
      this.chatList.push(chatObj)
      console.log(this.chatList)
    })
  }


  listenToUserTyping() {
    this._socket.listenTyping().subscribe((name: String) => {
      this.typingUser = name
    })
  }

  listenToRoomNameUpdate() {
    this._socket.roomNameUpdated().subscribe((name) => {
      this.currentRoom.name = name
    })
  }

  listenToRoomRemoved() {
    this._socket.roomRemoved().subscribe((name) => {
      this.toastr.info("The room you were in was removed.")
      this.currentRoom = undefined
    })
  }


  listenToRoomListUpdated() {
    this._socket.roomListUpdated().subscribe(() => {
      this.getRoomList()
    })
  }

  listenToNotInARoom() {
    this._socket.notInARoom().subscribe(() => {
      this.toastr.info("You are not in a room.","Chat not sent")
    })
  }




}
