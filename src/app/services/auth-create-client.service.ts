import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthCreateClientService {
  createClientObject;
  url = 'http://localhost:3000/pizzas';

  constructor(private http: HttpClient) { }

  addClient() {
    return this.http.post(this.url, this.createClientObject, { responseType: 'text' });
  }

}
