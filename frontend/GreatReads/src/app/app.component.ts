import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GreatReads';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {
  }

  public identity;
  public loggedIn;

  ngOnInit() {
    this.identity = this.auth.getIdentity();
    this.loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
  }

  ngDoCheck() {
    this.identity = this.auth.getIdentity();
    this.loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
  }


  logout() {
    localStorage.clear();
    this.auth.logout(this.identity.username).subscribe(
      response => {
      }
    )
    this.identity = null;
    this.router.navigate(['/']);
  }


}


