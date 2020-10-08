import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../models/book';
import { CommentModel } from '../models/comment';
import { LibrarianService } from '../librarian.service';
import { GLOBAL } from '../global';



@Component({
  selector: 'app-book-profile',
  templateUrl: './book-profile.component.html',
  styleUrls: ['./book-profile.component.css']
})
export class BookProfileComponent implements OnInit {

  public displayBook: Book;
  public status: String;
  public msg: String;
  public url: String;
  public comments: CommentModel[];
  public loggedIn: boolean;

  public editable: boolean;

  public newComment: CommentModel;
  public readingStatus = {
    id: 0,
    bookname: '',
    readername: '',
    toread: false,
    finished: false,
    current: 0,
    pages: 100,
    createdAt: null,
    updatedAt: null
  };

  public percent_read;

  constructor(
    private libr: LibrarianService,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this.editable = false;
    this.newComment = new CommentModel("", "", "", "", 0);
    this.displayBook = new Book("", "", null, "", "", "", 0, false, "");
    this.displayBook.name = this.route.snapshot.paramMap.get('name');
    this.loadData();
    this.newComment.book = this.displayBook.name;
    this.newComment.author = this.auth.getIdentity().username;
    this.loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
  }

  loadData() {
    this.libr.getBookByName(this.displayBook.name).subscribe(
      response => {
        if (response.name) {
          this.displayBook.authors = response.authors;
          this.displayBook.description = response.description;
          this.displayBook.genres = response.genres;
          this.displayBook.published = response.published;
          this.displayBook.rating = response.rating;
          this.displayBook.image = response.image;
          this.displayBook.approved = response.approved;
          this.displayBook.pdf = response.pdf;
        } else {
          this.status = 'error';
          this.msg = 'User does not exist';
        }
      });
    this.libr.getCommentsByBook(this.displayBook.name).subscribe(
      response => {
        this.comments = response;
      }
    );
    this.libr.getReadingStatus(this.displayBook.name, this.auth.getIdentity().username).subscribe(
      response => {
        this.readingStatus.readername = this.auth.getIdentity().username;
        this.readingStatus.bookname = this.displayBook.name;
        if (response != null)
          this.readingStatus = response;
        this.percent_read = Math.round((this.readingStatus.current / this.readingStatus.pages) * 100);
      }
    )
  }

  onSubmit(commentForm) {
    this.newComment.bookAuthors = this.displayBook.authors;
    console.log(this.displayBook.authors);
    this.libr.addComment(this.newComment).subscribe(
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

  updateReading() {
    this.readingStatus.finished = false;
    this.readingStatus.toread = false;
    this.libr.updateReadings(this.readingStatus).subscribe(
      response => {
        window.location.reload();
      }
    );

  }

  addAlreadyRead() {
    this.readingStatus.finished = true;
    this.readingStatus.toread = false;
    this.libr.updateReadings(this.readingStatus).subscribe(
      response => {
        window.location.reload();
      }
    );
  }

  addWantRead() {
    this.readingStatus.finished = false;
    this.readingStatus.toread = true;
    this.libr.updateReadings(this.readingStatus).subscribe(
      response => {
        window.location.reload();
      }
    );
  }

  remove() {
    this.libr.removeReadings(this.displayBook.name, this.auth.getIdentity().username).subscribe(
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

  editBook() {
    this.editable = true;
  }

  saveChanges() {
    this.editable = false;
    this.libr.updateBook(this.displayBook).subscribe(
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

