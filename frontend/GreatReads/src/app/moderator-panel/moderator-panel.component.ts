import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LibrarianService } from '../librarian.service';

@Component({
  selector: 'app-moderator-panel',
  templateUrl: './moderator-panel.component.html',
  styleUrls: ['./moderator-panel.component.css']
})
export class ModeratorPanelComponent implements OnInit {

  public unapproved_books;
  public identity;
  public status: string;

  constructor(
    private auth: AuthService,
    private libr: LibrarianService
  ) { }

  ngOnInit(): void {
    this.identity = this.auth.getIdentity();
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

}
