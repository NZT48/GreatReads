import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { LibrarianService } from '../librarian.service';
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({
    url: 'http://localhost:3800/api/upload_cover',
    itemAlias: 'image'
  });

  public status: string;
  public msg: string;
  public newBook: Book;
  public imgTest: string;

  public genre_one;
  public genre_two;
  public genre_three;

  public displayGenres;

  constructor(
    private libr: LibrarianService
  ) { }

  ngOnInit(): void {
    this.newBook = new Book("", "", null, "", "", "", 0, false, "");
    this.libr.getGenres().subscribe(
      response => {
        this.displayGenres = response;
      });
    this.uploader.onAfterAddingFile = function (item) {
      item.withCredentials = false;

      var fileExtension = '.' + item.file.name.split('.').pop();
      this.imgTest = Math.random().toString(36).substring(7) + new Date().getTime() + fileExtension;
      item.file.name = this.imgTest;
    };

  }

  onSubmit(form) {
    if (!(this.genre_one === "") || !(this.genre_two === "") || !(this.genre_three === ""))
      if (this.genre_one === this.genre_two || this.genre_one === this.genre_three || this.genre_three === this.genre_two) {
        this.status = 'error';
        this.msg = 'you need to choose three different genres or left empty';
        return;
      }
    if (this.uploader.queue[0] != undefined) {
      this.imgTest = this.uploader.queue[0].file.name;
      this.newBook.image = this.imgTest;
    } else
      this.newBook.image = '';
    this.newBook.genres = this.genre_one + ', ' + this.genre_two + ', ' + this.genre_three;
    this.libr.addBook(this.newBook).subscribe(
      response => {
        if (response.name && response.authors) {
          this.status = 'success';
          this.uploader.uploadAll();
          form.reset();
        }
        else if (response.exists) {
          this.status = 'error';
          this.msg = 'book with that name already exists';
        } else {
          this.status = 'error';
          this.msg = 'something went wrong';
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
