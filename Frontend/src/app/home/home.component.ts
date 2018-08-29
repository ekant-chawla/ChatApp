import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HelperService } from '../helper.service';
import { Router } from '../../../node_modules/@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public loginPassword: String
  public loginEmail: String
  public signupPassword: String
  public confirmPassword: String
  public signupEmail: String
  public firstName: String
  public lastName: String
  public showloader: boolean = false
  public registeredEmail: String



  constructor(private _api: ApiService, private _helper: HelperService, private _router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
    //this._helper.verifyUserLoginAndReroute()
  }


  login() {
    this.showloader = true
    this._api.login(this.loginEmail, this.loginPassword).subscribe((resp: any) => {
      this.showloader = false

      if (!resp.error) {
        localStorage.setItem('authToken', resp.data.authToken)
        localStorage.setItem('firstName', resp.data.firstName)
        localStorage.setItem('userId', resp.data.userId)
        if (resp.data.lastName) localStorage.setItem('lastName', resp.data.lastName)

        this.toastr.success(resp.message, 'Success')

        this.redirectToChat()

      } else {
        this.toastr.error(resp.message, 'Failed')
      }
    })
  }

  signup() {
    if (this.confirmPassword == this.signupPassword) {
      this.showloader = true
      this._api.signup(this.signupEmail, this.signupPassword, this.firstName, this.lastName).subscribe((resp:any) => {
        this.showloader = false
        if (!resp.error) {
          this.toastr.success(resp.message, 'Success')

          this.loginEmail = this.signupEmail
          this.loginPassword = this.signupPassword
          this.login()

        } else {
          this.toastr.error(resp.message, 'Failed')
        }
      })
    } else {
      this.toastr.error("Confirm password does not match signup password", "Error")
    }
  }

  redirectToChat() {
    this._router.navigate(['/chat'])
  }

  resetPassword() {
    this.showloader = true
    this._api.forgotPassword(this.registeredEmail).subscribe((resp: any) => {
      this.showloader = false
      if (resp.error) {
        this.toastr.error(resp.message, "Error")
      } else {
        this.toastr.success(resp.message, "Success")
      }
    })
  }


}
