import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public email: string;
  public status: string;
  public loggedIn: boolean;
  public msg: string;

  public new_password: string;
  public old_password: string;
  public confirm_pass: string;
  public psswdPattern = "^([a-z](?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!_@$%^&*-]).{3,})|([A-Z](?=.*?[0-9])(?=.*?[#?!_@$%^&*-]).{4,})$";
  public rgx;

  public identity;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.rgx = new RegExp(this.psswdPattern);
  }



  onSubmit() {
    if (this.loggedIn) {
      if (this.new_password != this.confirm_pass) {
        this.status = 'error';
        this.msg = 'Passwords are not same';
        return;
      } else {
        if (!this.rgx.test(this.new_password)) {
          this.status = 'error';
          this.msg = 'Wrong new password format';
          return;
        }
        this.auth.changePassword(this.identity.username, this.old_password, this.new_password).subscribe(
          response => {
            if (response.wrong_password) {
              this.status = 'error';
              this.msg = 'Wrong password typed in';
            } else {
              this.status = 'success';
              this.msg = 'Password changed';
              localStorage.clear();
              this.router.navigate(['/login']);
            }
          }
        );
      }
    } else {
      this.auth.forgot(this.email).subscribe(
        response => {
          if (response.success)
            this.status = 'success';
          if (response.unexisting_mail) {
            this.status = 'error';
          }
        }
      );
    }

  }


}
