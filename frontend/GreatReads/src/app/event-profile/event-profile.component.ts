import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from '../global';
import { PlannerService } from '../planner.service';
import { EventModel } from '../models/event';
import { EventPost } from '../models/eventpost';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-event-profile',
  templateUrl: './event-profile.component.html',
  styleUrls: ['./event-profile.component.css']
})
export class EventProfileComponent implements OnInit {

  public displayEvent: EventModel;
  public status: String;
  public msg: String;
  public url: String;

  public eventPost: EventPost;

  public posts;
  public notJoined;

  public unacceptedUsers;
  public followed;
  public usersInEvent;

  public readyDate: boolean;

  constructor(
    private planr: PlannerService,
    private route: ActivatedRoute,
    public auth: AuthService
  ) {
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this.displayEvent = new EventModel("", "", null, null, "", false, false);
    this.displayEvent.name = this.route.snapshot.paramMap.get('name');
    this.eventPost = new EventPost(this.displayEvent.name, this.auth.getIdentity().username, "");
    this.loadData();
  }

  loadData() {
    this.planr.getEventByName(this.displayEvent.name).subscribe(
      response => {
        if (response.name) {
          this.displayEvent.author = response.author;
          this.displayEvent.description = response.description;
          this.displayEvent.start = response.start;
          this.displayEvent.end = response.end;
          this.displayEvent.isPrivate = response.private;
          this.displayEvent.active = response.active;
          if (this.displayEvent.active || this.displayEvent.start == null) {
            this.readyDate = true;
          } else if (formatDate(this.displayEvent.start, 'yyyy-MM-dd', 'en_US') < formatDate(new Date(), 'yyyy-MM-dd', 'en_US') && formatDate(this.displayEvent.end, 'yyyy-MM-dd', 'en_US') > formatDate(new Date(), 'yyyy-MM-dd', 'en_US')) {
            this.readyDate = true;
          }
        } else {
          this.status = 'error';
          this.msg = 'User does not exist';
        }
      });
    this.planr.getEventPosts(this.displayEvent.name).subscribe(
      response => {
        if (response) {
          this.posts = response;

        } else {
          this.status = 'error';
          this.msg = 'User does not exist';
        }
      });
    this.planr.checkUser(this.displayEvent.name, this.auth.getIdentity().username).subscribe(
      response => {
        if (response.joined) {
          this.notJoined = false;
        } else {
          this.notJoined = true;
        }
      }
    );
    this.planr.getUnacceptedUsers(this.displayEvent.name).subscribe(
      response => {
        if (response != null) {
          this.unacceptedUsers = response;
        } else {
          this.unacceptedUsers = null;
        }
      }
    );
    this.planr.getEventUsers(this.displayEvent.name).subscribe(
      response => {
        if (response != null) {
          this.usersInEvent = response;
        } else {
          this.usersInEvent = null;
        }
      }
    );
    this.auth.getFollowed(this.auth.getIdentity().username).subscribe(
      response => {
        if (response != null) {
          this.followed = response;
        } else {
          this.followed = null;
        }
      }
    );

  }

  onSubmit(commentForm) {
    this.planr.addEventPost(this.eventPost).subscribe(
      response => {
        window.location.reload();
        if (response.author) {
          this.status = 'success';
          commentForm.reset();
        }
        else if (response.exists) {
          this.status = 'error';
        } else {
          this.status = 'error';
        }
      }
    )
  }


  addUserToEvent() {
    let accepted = !this.displayEvent.isPrivate;
    this.planr.addUserEvent({ event: this.displayEvent.name, user: this.auth.getIdentity().username, accepted }).subscribe(
      response => {
        window.location.reload();
      }
    )
  }

  acceptUser(user) {
    this.planr.acceptEventUser(this.displayEvent.name, user).subscribe(
      response => {
        this.unacceptedUsers.forEach((usertmp, index) => {
          if (usertmp.user == user) {
            this.unacceptedUsers.splice(index, 1);
          }
        });
        location.reload();
      },
      error => {
        console.log(<any>error);
      }
    );

  }

  rejectUser(user) {
    this.planr.rejectEventUser(this.displayEvent.name, user).subscribe(
      response => {
        this.unacceptedUsers.forEach((usertmp, index) => {
          if (usertmp.user == user) {
            this.unacceptedUsers.splice(index, 1);
          }
        });
        location.reload();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  addFollower(username) {
    this.planr.addUserEvent({ user: username, event: this.displayEvent.name, accepted: true }).subscribe(
      response => {
        this.followed.forEach((usertmp, index) => {
          if (usertmp.followed == username) {
            this.followed.splice(index, 1);
          }
        });
        location.reload();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  stopEvent() {
    this.planr.stopEvent(this.displayEvent.name).subscribe(
      response => {
        location.reload();
      },
      error => {
        console.log(<any>error);
      }
    );

  }

  startEvent() {
    this.planr.startEvent(this.displayEvent.name).subscribe(
      response => {
        location.reload();
      },
      error => {
        console.log(<any>error);
      }
    );

  }


}
