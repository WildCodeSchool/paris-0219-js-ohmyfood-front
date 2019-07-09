import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DessertService {

  dessertFormObject;
  url = 'http://localhost:3000/desserts';

  constructor(private http: HttpClient) { }

  addDessertType() {
    return this.http.post(this.url, this.dessertFormObject, { responseType: 'text' });
  }

  putDessertType() {
    return this.http.put(this.url, this.dessertFormObject, { responseType: 'text'});
  }

  delDessertType() {
    return this.http.delete(`${this.url}/?dessName=${this.dessertFormObject.dessName}`, { responseType: 'text'});
  }
}