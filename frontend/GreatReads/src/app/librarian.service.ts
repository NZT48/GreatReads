import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';


@Injectable({
  providedIn: 'root'
})
export class LibrarianService {

  public url: string;

  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getBookByName(name: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'book/' + name, { headers: headers });
  }

  getBooks(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'books', { headers: headers });
  }

  addBook(book): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = JSON.stringify(book);
    return this.http.post<any>(this.url + "add_book", params, { headers: headers })
  }

  updateBook(book): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = JSON.stringify(book);
    return this.http.post<any>(this.url + "update_book", params, { headers: headers })
  }

  updateBookPDF(name, pdf): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = JSON.stringify({ name: name, pdf: pdf });
    console.log(params);
    return this.http.post<any>(this.url + "update_book_pdf", params, { headers: headers })
  }

  getGenres(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'genres', { headers: headers });
  }

  addGenre(name): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'add_genre/' + name, { headers: headers });
  }

  removeGenre(name): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'remove_genre/' + name, { headers: headers });
  }

  getCommentsByBook(book: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'book_comment/' + book, { headers: headers });
  }

  getCommentsByAuthor(author: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'author_comment/' + author, { headers: headers });
  }

  addComment(comment): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = JSON.stringify(comment);
    return this.http.post<any>(this.url + "add_comment", params, { headers: headers })
  }

  getReadingBooks(username): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'reading/' + username, { headers: headers });
  }

  getToReadBooks(username): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'to_read/' + username, { headers: headers });
  }

  getFinishedBooks(username): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'finished/' + username, { headers: headers });
  }

  getReadingStatus(bookname, username): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'reading_status/' + bookname + '/' + username, { headers: headers });
  }

  removeReadings(book, username): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'remove_readings/' + book + '/' + username, { headers: headers });
  }

  updateReadings(reading): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = JSON.stringify(reading);
    return this.http.post<any>(this.url + "update_readings", params, { headers: headers })
  }

  getUnapprovedBooks(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'unapproved_books', { headers: headers });
  }

  acceptBook(book): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'accept_book/' + book, { headers: headers });
  }

  rejectBook(book): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'reject_book/' + book, { headers: headers });
  }

  getPieChartData(username): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'pie_chart/' + username, { headers: headers });
  }
}
