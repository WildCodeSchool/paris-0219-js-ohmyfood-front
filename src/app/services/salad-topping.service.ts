import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SaladService {

  saladFormObject;
  url = 'http://localhost:3000/salads-toppings';

  constructor(private http: HttpClient) { }

  addSaladType() {
    return this.http.post(this.url, this.saladFormObject, { responseType: 'text' });
  }

  putSaladType() {
    return this.http.put(this.url, this.saladFormObject, { responseType: 'text'});
  }

  delSaladType() {
    return this.http.delete(`${this.url}/?saladsToppingsName=${this.saladFormObject.saladsToppingsName}`, { responseType: 'text'});
  }
}
