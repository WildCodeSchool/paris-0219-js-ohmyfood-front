import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaladsDatasService {
  private basePath = 'http://localhost:3000';

  saladsSaucesFormTable;
  constructor(private http: HttpClient) { }

  addSaladsSauces(): Observable<any> {
    return this.http.get<any>(`${this.basePath}/saladsSauces`);
  }

  addSaladsBase(): Observable<any> {
    return this.http.get<any>(`${this.basePath}/saladsbase`);
  }
}
