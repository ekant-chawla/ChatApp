import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public socket
  private authToken
  constructor() { }


  startConnection() {

    this.authToken = localStorage.getItem('authToken')
    this.socket = io("http://localhost:3000/api/v1/chat")

    return new Observable((obs) => {
      this.socket.on('verifyUser', () => {
        obs.next()
      })
    })
  }

  setUser() {
    this.socket.emit('setUser', this.authToken)
  }

  authError() {
    return new Observable((obs) => {
      this.socket.on('authError', () => {
        obs.next()
      })
    })
  }

  joinRoom(roomId: String) {
    this.socket.emit('joinRoom', roomId)
  }

  leaveRoom() {
    this.socket.emit('leaveRoom')
  }

  userJoin() {
    return new Observable((obs) => {
      this.socket.on('userJoin', (name) => {
        obs.next(name)
      })
    })
  }

  userLeft() {
    return new Observable((obs) => {
      this.socket.on('userLeft', (name) => {
        obs.next(name)
      })
    })
  }

  sendChat(message: String) {
    this.socket.emit('newChat', message)
  }

  newChat(){
    return new Observable((obs) => {
      this.socket.on('newChat', (message) => {
        obs.next(message)
      })
    })
  }

  listenTyping(){
    return new Observable((obs) => {
      this.socket.on('typing', (name) => {
        obs.next(name)
      })
    })
  }


  typing(){
    this.socket.emit('typing')
  }


  roomNameUpdated(){
    return new Observable((obs) => {
      this.socket.on('roomNameUpdated', (name) => {
        obs.next(name)
      })
    })
  }

  roomRemoved(){
    return new Observable((obs) => {
      this.socket.on('roomRemoved', () => {
        obs.next()
      })
    })
  }


  roomListUpdated(){
    return new Observable((obs) => {
      this.socket.on('roomListUpdated', () => {
        obs.next()
      })
    })
  }

  notInARoom(){
    return new Observable((obs) => {
      this.socket.on('notInARoom', () => {
        obs.next()
      })
    })
  }



}
