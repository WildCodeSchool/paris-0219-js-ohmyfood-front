import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ForgotPasswordService {
  
  urlNewPssw = 'http://localhost:3000/login/TzApeyaNpBzRJmGrit59K4NJ5Cy';
  requestPasswordObject: Object;

  constructor(
    private http: HttpClient
  ) { }

  compareTokens() {
    return this.http.post(this.urlNewPssw, this.requestPasswordObject).toPromise()
  }
}
