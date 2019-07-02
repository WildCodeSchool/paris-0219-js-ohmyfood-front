import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  booleanLoggedIn = false;
  loginObject: Object;
  url = 'http://localhost:3000/login';
  urlProtected = 'http://localhost:3000/login/protected';
  urlUser = 'http://localhost:3000/users/userInfos';
  userInfoObject: Object;
  transfertObject;
  @Output() transfertUser: EventEmitter<any> = new EventEmitter;

  constructor(private http: HttpClient) { }

  getClientInformation() {
    return this.http.get(this.urlUser).toPromise();
  }

  loginCheck() {
    return this.http.post(this.url, this.loginObject, {responseType: "text"}).toPromise()
  }

  transfertUserFn(param) {
    this.transfertUser.emit(param)
  }

  routeProtection() {
    const token = JSON.parse(localStorage.getItem("token")).token;
    const header = {headers: {'Authorization' : `Bearer ${token}`}}
    return this.http.post(this.urlProtected, token, header)
    .toPromise();
  }
}
