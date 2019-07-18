import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ForgotPasswordService {
  
  urlNewPssw = 'http://localhost:3000/login/TzApeyaNpBzRJmGrit59K4NJ5Cy';
  requestPasswordObject: Object;
  urlPostNewPssw = 'http://localhost:3000/login/Lm18yduHpcacijU0y2Mi';
  newPssw;
  constructor(
    private http: HttpClient
  ) { }

  compareTokens() {
    return this.http.post(this.urlNewPssw, this.requestPasswordObject).toPromise()
  }

  putNewPssw() {
    return this.http.put(this.urlPostNewPssw, this.newPssw).toPromise()
  }
}
