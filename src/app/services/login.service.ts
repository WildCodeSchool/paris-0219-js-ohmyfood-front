import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginObject;
  url = 'http://localhost:3000/login';
  urlProtected = 'http://localhost:3000/login/protected'
  constructor(private http: HttpClient) { }

  loginCheck() {
    return this.http.post(this.url, this.loginObject, {responseType: "text"})
}

  routeProtection() {
    const token = localStorage.getItem("token");
    return this.http.post(this.urlProtected,{
      headers: {"Authorization": `Bearer ${token}`}
    });
  }
}
