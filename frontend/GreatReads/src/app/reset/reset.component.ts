import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  public status: string;
  public msg: string;
  public password: string;
  public confirm_pass: string;
  public token: string;
  private newUser: User;

  public psswdPattern = "^([a-z](?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!_@$%^&*-]).{3,})|([A-Z](?=.*?[0-9])(?=.*?[#?!_@$%^&*-]).{4,})$";

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    this.newUser = new User("", "", "", "", "", 1, "", "", "", null, false, null);

  }

  onSubmit() {
    if (this.password != this.confirm_pass) {
      this.status = 'error';
      this.msg = 'Passwords are not same';
      return;
    } else {
      this.status = 'success';
      let payload = { token: this.token, newpass: this.password };
      this.auth.reset(payload).subscribe(
        response => {
          if (response.username) {
            localStorage.setItem('loggedIn', JSON.stringify(true));
            this.newUser.username = response.username;
            this.newUser.password = response.password;
            this.newUser.country = response.country;
            this.newUser.city = response.city;
            this.newUser.birthday = response.birthday;
            this.newUser.role = response.role;
            this.newUser.mail = response.email;
            this.newUser.image = response.image;
            this.newUser.name = response.name;
            this.newUser.surname = response.surname;
            localStorage.setItem('identity', JSON.stringify(this.newUser));
            this.router.navigate(['/user']);
          } else {
            this.status = 'error';
            this.msg = 'Something went wrong';
          }
        }
      )
    }
  }

}
