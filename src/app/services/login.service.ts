import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  booleanLoggedIn;
  loginObject: Object;
  url = 'http://localhost:3000/login';
  urlProtected = 'http://localhost:3000/login/protected';
  urlUser = 'http://localhost:3000/users/userInfos';
  userInfoObject;
  urlGetNewPssw = 'http://localhost:3000/login/forgottenPassword';
  userMailNewPssw: Object;

  @Output() transfertUser: EventEmitter<any> = new EventEmitter;
  @Output() transfertUserRight: EventEmitter<any> = new EventEmitter;

  constructor(private http: HttpClient) { }

  loginCheck() {
    return this.http.post(this.url, this.loginObject, {responseType: "text"}).toPromise()
  }

  transfertUserFn(param) {
    this.transfertUser.emit(param);
  }

  transfertUserRightFn(right) {
    this.transfertUserRight.emit(right);
  }

  routeProtection() {
    const token = localStorage.getItem("token");
    const header = {headers: {'Authorization' : `Bearer ${token}`}}
    return this.http.post(this.urlProtected, token, header).toPromise()
  }

  getNewPssw() {
    return this.http.post(this.urlGetNewPssw, this.userMailNewPssw).toPromise()
  }
}
