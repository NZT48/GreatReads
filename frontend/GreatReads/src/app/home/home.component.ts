import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public identity;
  public loggedIn;
  public guest: boolean;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.identity = this.auth.getIdentity();
    this.loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    this.guest = false;
  }

  setGuest() {
    this.identity = false;
    this.loggedIn = false;
    this.guest = true;
    localStorage.setItem('identity', JSON.stringify(false));
    localStorage.setItem('loggedIn', JSON.stringify(false));
    this.router.navigate(['/home']);
  }

}
