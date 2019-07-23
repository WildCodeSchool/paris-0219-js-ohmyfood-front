import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAccountInformationsService {

  userMail: string;
  url = 'http://localhost:3000/users/account';
  userAccountObject;

  constructor(private http: HttpClient) { }

  getClientAccountInfos() {
    return this.http.post(this.url, {'0': this.userMail}, { responseType: 'text' }).toPromise()
  }

  putClientAccountInfos() {
    return this.http.put(this.url, this.userAccountObject, {responseType: 'text'}).toPromise()
  }
}
