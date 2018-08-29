import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private userUrl = '/api/v1/user'
  private roomUrl = '/api/v1/room'

  constructor(private _http: HttpClient) { }

  // user related apis
  login(email, password) {
    return this._http.post(this.userUrl + '/login', { email: email, password: password })
  }

  signup(email: String, password: String, firstName: String, lastName?: String) {
    let body = { email: email, password: password, firstName: firstName }
    if (lastName && lastName.trim() != '') body['lastName'] = lastName
    return this._http.post(this.userUrl + '/signup', body)
  }

  forgotPassword(email: String) {
    return this._http.post(this.userUrl + '/forgotPass', { email: email })
  }

  resetPassword(authToken: String, newPassword: String) {
    return this._http.post(this.userUrl + '/updatePass', { authToken: authToken, password: newPassword })
  }



  // Room related apis
  createRoom(name: String) {
    let authToken = localStorage.getItem('authToken')
    return this._http.post(this.roomUrl + '/create', { authToken: authToken, name: name })
  }

  listChat(roomId: String) {
    let authToken = localStorage.getItem('authToken')
    return this._http.post(this.roomUrl + '/chatlist', { authToken: authToken, roomId: roomId })
  }


  listRooms() {
    let authToken = localStorage.getItem('authToken')
    return this._http.post(this.roomUrl + '/list', { authToken: authToken })
  }

  renameRoom(name: String, roomId: String) {
    let authToken = localStorage.getItem('authToken')
    return this._http.post(this.roomUrl + '/update', { authToken: authToken, name: name, roomId: roomId })
  }

  deactivateRoom(roomId: String) {
    let authToken = localStorage.getItem('authToken')
    return this._http.post(this.roomUrl + '/deactivate', { authToken: authToken, roomId: roomId })
  }

  activateRoom(roomId: String) {
    let authToken = localStorage.getItem('authToken')
    return this._http.post(this.roomUrl + '/activate', { authToken: authToken, roomId: roomId })
  }

  deleteRoom(roomId: String) {
    let authToken = localStorage.getItem('authToken')
    return this._http.post(this.roomUrl + '/delete', { authToken: authToken, roomId: roomId })
  }



}
