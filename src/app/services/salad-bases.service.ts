import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SaladBasesService {

  baseFormObject;
  url = 'http://localhost:3000/salads-bases';

  constructor(private http: HttpClient) { }

  addBaseType() {
    return this.http.post(this.url, this.baseFormObject, { responseType: 'text' });
  }

  putBaseType() {
    return this.http.put(this.url, this.baseFormObject, { responseType: 'text'});
  }

  delBaseType() {
    return this.http.delete(`${this.url}/?saladsBaseName=${this.baseFormObject.saladsBaseName}`, { responseType: 'text'});
  }
}
