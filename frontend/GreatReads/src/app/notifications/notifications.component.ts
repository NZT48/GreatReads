import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  public notifications;
  public username;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.username = this.auth.getIdentity().username;
    this.auth.getNotifications(this.username).subscribe(
      response => {
        this.notifications = response;
      }
    )
  }

}
