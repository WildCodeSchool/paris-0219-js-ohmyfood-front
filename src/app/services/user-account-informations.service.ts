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
  userAccountObject: Object = {
    lastName: '',
    firstName: '',
    mail: '',
    phoneNumber: '',
    password: ''
  }
  userAccountAddressObject: Object = {
    '0': {
      address1: '',
      address2: '',
      zipcode: '',
      city: '',
      userAddressFacturation: ''
    },
    '1': {
      mail: localStorage.getItem('userMail')
    }
  };

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

  delClientAccount() {
    return this.http.delete(`${this.url}/?mail=${this.userMail}`, { responseType: 'text' }).toPromise()
  }
}
