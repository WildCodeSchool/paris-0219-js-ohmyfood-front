import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BeverageService {

  beverageFormObject;
  url = 'http://localhost:3000/beverages';

  constructor(private http: HttpClient) { }

  addBeverageType() {
    return this.http.post(this.url, this.beverageFormObject, { responseType: 'text' });
  }

  putBeverageType() {
    return this.http.put(this.url, this.beverageFormObject, { responseType: 'text'});
  }

  delBeverageType() {
    return this.http.delete(`${this.url}/?beverageName=${this.beverageFormObject.bevName}`, { responseType: 'text'});
  }
}
