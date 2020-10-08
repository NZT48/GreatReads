import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from './models/user';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public url: string;
  public identity;

  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
  }

  register(user: User, admin = false): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    if (admin)
      return this.http.post(this.url + 'admin_register', JSON.stringify(user), { headers: headers });
    else
      return this.http.post(this.url + 'register', JSON.stringify(user), { headers: headers });
  }

  login(data): Observable<any> {

    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(this.url + 'login', params, { headers: headers });
  }

  logout(username: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'logout/' + username, { headers: headers });
  }

  getUser(username: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'user/' + username, { headers: headers });
  }

  getUsers(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'users', { headers: headers });
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'));

    if (identity != "undefined") {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
  }


  getUnapproved(): Observable<any> {

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(this.url + 'unapproved', { headers: headers });
  }

  accept(user): Observable<any> {

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = JSON.stringify(user);

    return this.http.post(this.url + 'accept', params, { headers: headers });
  }

  reject(user): Observable<any> {

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = JSON.stringify(user);

    return this.http.post(this.url + 'reject', params, { headers: headers });
  }

  sendToken(token) {
    return this.http.post<any>(this.url + "token_validate", { recaptcha: token })
  }

  forgot(email): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = JSON.stringify({ email: email });
    return this.http.post<any>(this.url + "forgot", params, { headers: headers });

  }

  reset(payload): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = JSON.stringify(payload);
    return this.http.post<any>(this.url + "reset", params, { headers: headers });

  }

  changePassword(username, old_password, new_password): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let payload = { new_password: new_password, old_password: old_password, username: username };
    let params = JSON.stringify(payload);
    return this.http.post<any>(this.url + "change_password", params, { headers: headers })
  }

  changeRole(changed_role, username_changed_role): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let payload = { new_role: changed_role, username: username_changed_role };
    let params = JSON.stringify(payload);
    return this.http.post<any>(this.url + "change_role", params, { headers: headers })
  }

  updateUser(user): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = JSON.stringify(user);
    return this.http.post<any>(this.url + "update_user", params, { headers: headers })
  }

  follow(follower: string, followed: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'follow/' + follower + '/' + followed, { headers: headers });
  }

  unfollow(follower: string, followed: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'unfollow/' + follower + '/' + followed, { headers: headers });
  }

  doFollow(follower: string, followed: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'do_follow/' + follower + '/' + followed, { headers: headers });
  }

  getFollowers(username: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'get_followers/' + username, { headers: headers });
  }

  getFollowed(username: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'get_followed/' + username, { headers: headers });
  }

  getNotifications(username: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'notifications/' + username, { headers: headers });
  }
}
