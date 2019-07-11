import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAccountInformationsService {

  userMail: string;

  url = 'http://localhost:3000/users/account';

  constructor(private http: HttpClient) { }

  getClientAccountInfos() {
    return this.http.post(this.url, {'0': this.userMail}, { responseType: 'text' }).toPromise()
  }
}
