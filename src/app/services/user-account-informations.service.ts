import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAccountInformationsService {

  userMail: string;
  url = 'http://localhost:3000/users/account';
  urlUserPut = this.url + '/user';
  urlUserAddressPut = this.url + '/userAddress';
  userAccountObject;
  userAccountAddressObject;

  constructor(private http: HttpClient) { }

  getClientAccountInfos() {
    return this.http.post(this.url, {'0': this.userMail}, { responseType: 'text' }).toPromise()
  }

  putClientAccountInfos() {
    return this.http.put(this.urlUserPut, this.userAccountObject, {responseType: 'text'}).toPromise()
  }

  putClientAccountAddressInfos() {
    return this.http.put(this.urlUserAddressPut, this.userAccountAddressObject, {responseType: 'text'}).toPromise()
  }
}
