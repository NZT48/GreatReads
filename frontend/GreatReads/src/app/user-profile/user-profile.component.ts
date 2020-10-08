import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from '../global';
import { CommentModel } from '../models/comment';
import { LibrarianService } from '../librarian.service';
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({
    url: 'http://localhost:3800/api/upload_image',
    itemAlias: 'image'
  });

  public displayUser: User;
  public status: String;
  public msg: String;
  public url: String;
  public comments: CommentModel[];

  public reading;
  public finished;
  public toread;

  public editable: boolean;;
  public imgTest: string;

  public following;
  public activeUser;

  public pieChartLabels: string[] = ['s', 'c', 'd', 'g', 'Chrome', 'Safari', 'Firefox', 'Internet Explorer', 'Other'];
  public pieChartData: number[] = [40, 20, 20, 10, 10, 5, 5, 5, 5];
  public pieChartType: string = 'pie';
  public chartColors: any[] = [
    {
      backgroundColor: ["#ffbe76", "#2a5547", "#007a7c", "#345a5e", "#3498db", "#b381b3", "#e26a6a", "#808080", "#b8860b", "#b50000", "#1d1905", "#551700"]
    }];

  currentIndex = -1;

  page = 1;
  count = 0;
  pageSize = 2;
  pageSizes = [2, 5, 10];

  constructor(
    public auth: AuthService,
    private libr: LibrarianService,
    private route: ActivatedRoute
  ) {
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this.editable = false;
    this.displayUser = new User("", "", "", "", "", 1, "", "", "", null, false, null);
    this.displayUser.username = this.route.snapshot.paramMap.get('username');
    if (this.displayUser.username == null) {
      this.displayUser.username = this.auth.getIdentity().username;
    }
    this.activeUser = this.auth.getIdentity().username;
    this.loadData();
    this.uploader.onAfterAddingFile = function (item) {
      item.withCredentials = false;

      var fileExtension = '.' + item.file.name.split('.').pop();
      this.imgTest = Math.random().toString(36).substring(7) + new Date().getTime() + fileExtension;
      item.file.name = this.imgTest;
    };
  }

  loadData() {
    this.auth.getUser(this.displayUser.username).subscribe(
      response => {
        if (response.username) {
          this.displayUser.username = response.username;
          this.displayUser.password = response.password;
          this.displayUser.country = response.country;
          this.displayUser.city = response.city;
          this.displayUser.birthday = response.birthday;
          this.displayUser.role = response.role;
          this.displayUser.mail = response.email;
          this.displayUser.image = response.image;
          this.displayUser.name = response.name;
          this.displayUser.surname = response.surname;
          this.displayUser.active = response.active;
          this.displayUser.last_active = response.last_active;
        } else {
          this.status = 'error';
          this.msg = 'User does not exist';
        }
      });
    this.libr.getPieChartData(this.displayUser.username).subscribe(
      response => {
        this.pieChartLabels = response.labels;
        this.pieChartData = response.data;
      }
    );
    this.libr.getCommentsByAuthor(this.displayUser.username).subscribe(
      response => {
        this.comments = response;
      }
    );
    this.libr.getReadingBooks(this.displayUser.username).subscribe(
      response => {
        this.reading = response;
      }
    );
    this.libr.getFinishedBooks(this.displayUser.username).subscribe(
      response => {
        this.finished = response;
        this.count = response.length;
      }
    );
    this.libr.getToReadBooks(this.displayUser.username).subscribe(
      response => {
        this.toread = response;
      }
    );
    this.auth.doFollow(this.activeUser, this.displayUser.username).subscribe(
      response => {
        if (response != null) {
          this.following = true;
        } else {
          this.following = false;
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  editProfile() {
    this.editable = true;
  }

  saveChanges() {
    this.editable = false;
    let uploadIt = false;
    if (this.uploader.queue[0] != undefined) {
      this.imgTest = this.uploader.queue[0].file.name;
      this.displayUser.image = this.imgTest;
      uploadIt = true;
    }
    this.auth.updateUser(this.displayUser).subscribe(
      response => {
        if (response.success) {
          if (uploadIt) {
            this.uploader.uploadAll();
          }
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  followUser(followed) {
    this.auth.follow(this.activeUser, this.displayUser.username).subscribe(
      response => {
        window.location.reload();
        if (response.success) {

        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  unfollowUser(followed) {
    this.auth.unfollow(this.activeUser, this.displayUser.username).subscribe(
      response => {
        window.location.reload();
        if (response.success) {

        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  remove(book) {
    this.libr.removeReadings(book.bookname, this.displayUser.username).subscribe(
      response => {
        window.location.reload();
        if (response.success) {

        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
      }
    );
  }


  handlePageChange(event): void {
    this.page = event;
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }

}
