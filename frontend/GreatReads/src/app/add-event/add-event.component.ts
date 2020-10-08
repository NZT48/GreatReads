import { Component, OnInit } from '@angular/core';
import { PlannerService } from '../planner.service';
import { EventModel } from '../models/event';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  constructor(
    private planr: PlannerService,
    private auth: AuthService
  ) { }

  public status: string;
  public newEvent: EventModel;

  public isContent: boolean[];
  public isFinished: boolean;

  public isStarted: boolean;
  public noEnd: boolean;

  public followed;
  public checkBoxes: boolean[];


  ngOnInit(): void {
    this.isContent = [true, false, false, false, false, false, false];
    this.checkBoxes = [false];
    this.isFinished = false;
    this.newEvent = new EventModel("", "", null, null, "", true, false);
    this.auth.getFollowed(this.auth.getIdentity().username).subscribe(
      response => {
        if (response != null) {
          this.followed = response;
          this.followed.forEach(element => {
            this.checkBoxes.push(false);
          });
        } else {
          this.followed = null;
        }
      }
    );
  }

  onSubmit() {
    this.newEvent.author = this.auth.getIdentity().username;
    this.newEvent.active = this.isStarted;
    this.planr.addEvent(this.newEvent).subscribe(
      response => {
        if (response.name && response.author) {
          this.status = 'success';
          for (let i = 0; i < this.checkBoxes.length - 1; i++) {
            if (this.checkBoxes[i]) {
              this.addFollower(this.followed[i].followed);
            }
          }
          this.addFollower(this.auth.getIdentity().username);
        }
        else if (response.exists) {
          this.status = 'error';
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
      }
    );
    this.next(7);
  }

  next(num) {
    this.isContent[num - 1] = false;
    this.isContent[num] = true;
    switch (num) {
      case 1:
        if (this.auth.getIdentity().role == 1) {
          this.isContent[num] = false;
          this.isContent[2] = true;
        }
        break;
      case 2:
        if (!this.newEvent.isPrivate) {
          this.isContent[num] = false;
          this.isContent[num + 1] = true;
        }
        break;
      case 4:
        if (this.isStarted) {
          this.isContent[num] = false;
          this.isContent[num + 1] = true;
          this.newEvent.start = null;
        }
        break;
      case 6:
        if (this.noEnd) {
          this.isContent[num] = false;
          this.isContent[num + 1] = true;
          this.newEvent.end = null;
          this.onSubmit();
        }
        break;
    }
  }

  back(num) {
    this.isContent[num + 1] = false;
    this.isContent[num] = true;
    switch (num) {
      case 0:
        this.isContent[0] = true;
        this.isContent[7] = false;
        break;
      case 1:
        if (this.auth.getIdentity().role > 1) {
          this.isContent[num] = false;
          this.isContent[num - 1] = true;
        } else {
          this.isContent[0] = true;
          this.isContent[num] = false;
        }
        break;
      case 2:
        if (!this.newEvent.isPrivate) {
          this.isContent[0] = true;
          this.isContent[num] = false;
        }
        break;
      case 4:
        if (this.isStarted) {
          this.isContent[num + 1] = false;
          this.isContent[num] = false;
          this.isContent[num - 1] = true;
        }
        break;
      case 6:
        if (this.noEnd) {
          this.isContent[num + 1] = false;
          this.isContent[num] = false;
          this.isContent[num - 1] = true;
        }
        break;
    }
  }

  addFollower(username) {
    this.planr.addUserEvent({ user: username, event: this.newEvent.name, accepted: true }).subscribe(
      response => {
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
