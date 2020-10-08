import { Component, OnInit } from '@angular/core';
import { LibrarianService } from '../librarian.service';


@Component({
  selector: 'app-book-timeline',
  templateUrl: './book-timeline.component.html',
  styleUrls: ['./book-timeline.component.css']
})
export class BookTimelineComponent implements OnInit {

  public books;


  public sName: string;
  public sAuthor: string;
  public sGenre: string;
  public srchName: string;
  public srchAuthor: string;
  public srchGenre: string;
  public searched: boolean;
  public count: number;
  public exist;

  public displayGenres;

  public loggedIn;

  constructor(
    private libr: LibrarianService
  ) {
    this.searched = false;

  }

  ngOnInit(): void {
    this.exist = true;
    this.loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    this.libr.getGenres().subscribe(
      response => {
        this.displayGenres = response;
      });
    this.libr.getBooks().subscribe(
      response => {
        this.books = response;
      }
    )
  }

  search() {
    this.searched = true;
    this.exist = false;
    this.srchAuthor = this.sAuthor;
    this.srchGenre = this.sGenre;
    this.srchName = this.sName;
    this.books.forEach(book => {
      if (((this.srchName != undefined && this.srchName != "") ? book.name.toLowerCase().includes(this.srchName.toLowerCase()) : true)
        && ((this.srchAuthor != undefined && this.srchAuthor != "") ? book.authors.toLowerCase().includes(this.srchAuthor.toLowerCase()) : true)
        && ((this.srchGenre != undefined && this.srchGenre != "") ? book.genres.toLowerCase().includes(this.srchGenre.toLowerCase()) : true)) {
        this.exist = true;
      }
    });
  }

  checkForSearch(book) {
    if (!this.searched) {
      return true;
    } else {
      if (((this.srchName != undefined && this.srchName != "") ? book.name.toLowerCase().includes(this.srchName.toLowerCase()) : true)
        && ((this.srchAuthor != undefined && this.srchAuthor != "") ? book.authors.toLowerCase().includes(this.srchAuthor.toLowerCase()) : true)
        && ((this.srchGenre != undefined && this.srchGenre != "") ? book.genres.toLowerCase().includes(this.srchGenre.toLowerCase()) : true)) {
        return true;
      } else
        return false;
    }
  }



}
