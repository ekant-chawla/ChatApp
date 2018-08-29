import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private _router: Router, private toastr: ToastrService) { }

  verifyUserLoginAndReroute() {

    if (!localStorage.getItem('authToken')) {
      this.logout(false)
      this.toastr.info("Redirecting to home", "Invalid/Expired session")
    }
  }

  logout(showMessage:Boolean = true) {
    localStorage.clear()
    this._router.navigate(['/home'])
    if(showMessage) this.toastr.success("User successfuly logged out", "Success")
  }



}
