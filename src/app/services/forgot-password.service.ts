import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ForgotPasswordService implements CanActivate{
  
  urlNewPssw = 'http://localhost:3000/login/newPassword';
  requestPasswordObject: Object;
  booleanGuard = 0;
  constructor(
    private http: HttpClient
  ) { }

  compareTokens() {
    return this.http.post(this.urlNewPssw, this.requestPasswordObject)
  }

  canActivate(): boolean {
    if (this.booleanGuard == 0) {
      console.log(this.canActivate)
      return false
    } else {
      console.log(this.canActivate)
      return true
    }
  }
}
