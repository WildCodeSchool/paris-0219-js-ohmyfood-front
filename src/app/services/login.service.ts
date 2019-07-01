import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginObject;
  url = 'http://localhost:3000/login';
  urlProtected = 'http://localhost:3000/login/protected';
  constructor(private http: HttpClient) { }

  loginCheck() {
    return this.http.post(this.url, this.loginObject, {responseType: "text"}).toPromise()
  }

  routeProtection() {
    const token = JSON.parse(localStorage.getItem("token")).token;
    const header = {headers: {'Authorization' : `Bearer ${token}`}}
    return this.http.post(this.urlProtected, token, header)
    .toPromise();
  }
}
