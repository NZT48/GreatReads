import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public status: string;
  public username: string;
  public password: string;
  public msg: string;
  public identity;
  public token;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    var data = { username: this.username, password: this.password };
    this.auth.login(data).subscribe(
      response => {
        if (response.succesful_login) {
          this.identity = response.user;
          localStorage.setItem('loggedIn', JSON.stringify(true));
          localStorage.setItem('identity', JSON.stringify(this.identity));
          if (this.identity.role == 3) {
            this.router.navigate(['/admin_panel']);
          } else {
            this.router.navigate(['/user/' + this.identity.username]);
          }
        } else if (response.wrong_password) {
          this.status = 'error';
          this.msg = 'wrong password';
        } else {
          this.status = 'error';
          this.msg = "this user doesn't exist.";
        }
      },
      error => {
        console.log(<any>error);
        var errorMessage = <any>error;
        if (errorMessage != null) {
          this.status = 'error';
          this.msg = 'something went wrong.';
        }
      }
    );
  }

}
