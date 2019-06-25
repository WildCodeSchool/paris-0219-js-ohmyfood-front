import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginObject;
  url = 'http://localhost:3000/login';

  constructor(private http: HttpClient) { }

  loginCheck(email: string, password: string) {
    return this.http.post<{access_token: string}>(this.url, {email, password}).pipe(tap(res => {
      localStorage.setItem('access_token', res.access_token);
    }))
  }
}
