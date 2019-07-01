import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginObject: Object;
  url = 'http://localhost:3000/login';
  urlProtected = 'http://localhost:3000/login/protected';
  urlUser = 'http://localhost:3000/users/userInfos';
  userInfoObject: Object;

  constructor(private http: HttpClient) { }

  getClientInformation() {
    return this.http.get(this.urlUser).toPromise();
  }

  getClientInformationDone() {
    return this.http.get(this.urlUser).subscribe(res => { 
      if (this.userInfoObject['mail'] !== undefined) {
        console.log('rfgbtrgerbe')
      }
    })
  }

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
