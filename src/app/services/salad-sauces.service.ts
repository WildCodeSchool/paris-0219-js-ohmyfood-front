import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SaladSaucesService {

  sauceFormObject;
  url = 'http://localhost:3000/saladsSauces';

  constructor(private http: HttpClient) { }

  addSauceType() {
    return this.http.post(this.url, this.sauceFormObject, { responseType: 'text' });
  }

  putSauceType() {
    return this.http.put(this.url, this.sauceFormObject, { responseType: 'text'});
  }

  delSauceType() {
    return this.http.delete(`${this.url}/?saladsSaucesName=${this.sauceFormObject.saladsSaucesName}`, { responseType: 'text'});
  }
}
