import { Component, OnInit, OnChanges, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core'

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit, OnChanges {

  public list: Array<any>
  public userId: String

  @Input()
  public groupList: Array<any>

  @Input()
  public currentRoomId: String

  @Output()
  join: EventEmitter<String> = new EventEmitter()

  @Output()
  edit: EventEmitter<String> = new EventEmitter()

  @Output()
  delete: EventEmitter<String> = new EventEmitter()

  constructor() {
  }

  ngOnInit() {
    this.list = this.groupList
    this.userId = localStorage.getItem("userId")
  }

  ngOnChanges() {
    this.list = this.groupList
    console.log(this.list)

  }

  joinRoom(roomId: String) {
    this.currentRoomId = roomId
    this.join.emit(roomId)
  }

  editRoom(roomId: String) {
    this.edit.emit(roomId)
  }

  deleteRoom(roomId: String) {
    this.delete.emit(roomId)
  }

}
