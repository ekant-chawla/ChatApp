import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  private authToken: String
  public confirmPassword: String
  public newPassword
  private clicked: Boolean = false
  constructor(private _route: ActivatedRoute, private _router: Router, private __api: ApiService, private toastr: ToastrService) { }

  ngOnInit() {
    this.authToken = this._route.snapshot.queryParamMap.get('token')
    console.log(this.authToken)
  }

  resetPassword() {
    if (!this.clicked) {
      this.clicked = true;
      this.__api.resetPassword(this.authToken, this.newPassword).subscribe((resp: any) => {
        if (resp.error) {
          this.toastr.error("Invalid or used password reset url.", "Error")
        } else {
          this.toastr.success(resp.message, "Success")
          this._router.navigate(['/home'])
        }
      })
    }
  }




}
