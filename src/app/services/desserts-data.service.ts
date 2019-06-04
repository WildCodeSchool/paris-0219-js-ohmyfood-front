import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DessertsDataService {

  dessertsRoute = 'desserts';

  constructor(private http: HttpClient) { }

  getDesserts(): Observable<object> {
    return this.http.get(this.dessertsRoute);
  }
}
