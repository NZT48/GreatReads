import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class PlannerService {

  public url: string;

  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getEventByName(name: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'event/' + name, { headers: headers });
  }

  getEvents(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'events', { headers: headers });
  }

  addEvent(event): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = JSON.stringify(event);
    return this.http.post<any>(this.url + "add_event", params, { headers: headers })
  }

  addEventPost(post): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = JSON.stringify(post);
    return this.http.post<any>(this.url + "add_event_post", params, { headers: headers })
  }

  addUserEvent(user): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = JSON.stringify(user);
    return this.http.post<any>(this.url + "add_user_event", params, { headers: headers })
  }

  getUnacceptedUsers(event): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'get_unaccepted_event_users/' + event, { headers: headers });
  }

  getEventPosts(event): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'get_event_posts/' + event, { headers: headers });
  }

  acceptEventUser(event, user): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'accept_event_user/' + event + '/' + user, { headers: headers });
  }

  rejectEventUser(event, user): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'reject_event_user/' + event + '/' + user, { headers: headers });
  }

  checkUser(event, user): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'check_event_user/' + event + '/' + user, { headers: headers });
  }

  getEventUsers(event): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'get_event_users/' + event, { headers: headers });
  }

  startEvent(event): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'start_event/' + event, { headers: headers });
  }

  stopEvent(event): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'stop_event/' + event, { headers: headers });
  }

}
