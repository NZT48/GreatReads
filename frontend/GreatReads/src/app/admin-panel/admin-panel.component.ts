import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../models/user';
import { LibrarianService } from '../librarian.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({
    url: 'http://localhost:3800/api/upload_pdf',
    itemAlias: 'pdf'
  });
  public pdfTest: string;
  public bookNamePDF: string;


  public unapproved_books;
  public unapproved_users;
  public identity;
  public status: string;

  public genreName: string;
  public genre_msg: string;
  public genre_status: string;


  public user: User;

  public username_changed_role: string;
  public changed_role: number;
  public role_msg: string;

  psswdPattern = "^([a-z](?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!_@$%^&*-]).{3,})|([A-Z](?=.*?[0-9])(?=.*?[#?!_@$%^&*-]).{4,})$";
  mailRgxPattern = "^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9]{2,}\.[a-zA-Z]{2,4}$";
  public rgxPswd;

  public books;


  constructor(
    private auth: AuthService,
    private libr: LibrarianService
  ) {
    this.user = new User("", "", "", "", "", 1, "", "", "", null, false, null);
  }

  ngOnInit(): void {
    this.rgxPswd = new RegExp(this.psswdPattern);
    this.identity = this.auth.getIdentity();
    this.libr.getBooks().subscribe(
      response => {
        this.books = response;
      }
    )
    this.auth.getUnapproved().subscribe(
      response => {
        if (response.length > 0)
          this.unapproved_users = response;
        else
          this.unapproved_users = null;
      },
      error => {
        console.log(<any>error);
      }
    );
    this.libr.getUnapprovedBooks().subscribe(
      response => {
        if (response.length > 0)
          this.unapproved_books = response;
        else
          this.unapproved_books = null;
      },
      error => {
        console.log(<any>error);
      }
    );
    this.uploader.onAfterAddingFile = function (item) {
      item.withCredentials = false;

      var fileExtension = '.' + item.file.name.split('.').pop();
      this.pdfTest = Math.random().toString(36).substring(7) + new Date().getTime() + fileExtension;
      item.file.name = this.pdfTest;
    };
  }

  accept(user) {
    this.auth.accept(user).subscribe(
      response => {
        this.unapproved_users.forEach((usertmp, index) => {
          if (usertmp.username == user.username) {
            this.unapproved_users.splice(index, 1);
          }
        });
        location.reload();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  reject(user) {
    this.auth.reject(user).subscribe(
      response => {
        this.unapproved_users.forEach((usertmp, index) => {
          if (usertmp.username == user.username) {
            this.unapproved_users.splice(index, 1);
          }
        });
        location.reload();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  onSubmit(form) {
    if (!this.rgxPswd.test(this.user.password)) {
      this.status = 'error';
      return;
    }
    this.auth.register(this.user, true).subscribe(
      response => {
        if (response.name && response.username) {
          this.status = 'succes';
          form.reset();
        }
        else if (response.username_used) {
          console.log('username alredy in use')
          this.status = 'error';
        } else if (response.mail_used) {
          console.log('mail alredy in use')
          this.status = 'error';
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  acceptBook(book) {
    this.libr.acceptBook(book.name).subscribe(
      response => {
        this.unapproved_books.forEach((booktmp, index) => {
          if (booktmp.name == book.name) {
            this.unapproved_books.splice(index, 1);
          }
        });
        location.reload();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  rejectBook(book) {
    this.libr.rejectBook(book.name).subscribe(
      response => {
        this.unapproved_books.forEach((booktmp, index) => {
          if (booktmp.name == book.name) {
            this.unapproved_books.splice(index, 1);
          }
        });
        location.reload();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  changeRole(form) {
    if (this.changed_role == undefined || this.username_changed_role == undefined || this.username_changed_role == '') {
      this.role_msg = 'Error: role or username not chosen';
      return;
    }
    this.auth.changeRole(this.changed_role, this.username_changed_role).subscribe(
      response => {
        if (response.success) {
          this.role_msg = 'Role successfuly changed!';
          form.reset();
        }
        else
          this.role_msg = 'This user does not exist.';
      },
      error => {
        console.log(<any>error);
      }
    );

  }

  addGenre() {
    this.libr.addGenre(this.genreName).subscribe(
      response => {
        if (response.success) {
          this.genre_status = 'success';
          this.genre_msg = 'Genre successfuly added!';
        }
        else {
          this.genre_status = 'error';
          this.genre_msg = 'This genre already exist.';
        }
      },
      error => {
        console.log(<any>error);
      }
    );

  }

  removeGenre() {
    this.libr.removeGenre(this.genreName).subscribe(
      response => {
        if (response.success) {
          this.genre_status = 'success';
          this.genre_msg = 'Genre successfuly removed!';
        }
        else if (response.count_not_zero) {
          this.genre_status = 'error';
          this.genre_msg = 'This genre is added to some books';
        }
        else {
          this.genre_status = 'error';
          this.genre_msg = 'This genre does not exist.';
        }
      },
      error => {
        console.log(<any>error);
      }
    );

  }

  addPDF() {
    if (this.uploader.queue[0] != undefined) {
      this.pdfTest = this.uploader.queue[0].file.name;
    }
    this.uploader.uploadAll();
    this.libr.updateBookPDF(this.bookNamePDF, this.pdfTest).subscribe(
      response => {
        if (response.success) {
          this.status = 'succs';
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
