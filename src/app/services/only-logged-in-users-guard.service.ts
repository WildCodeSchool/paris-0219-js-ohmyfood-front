import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class OnlyLoggedInUsersGuardService implements CanActivate {
  
  constructor(
    private loginService: LoginService
  ) {}

  canActivate(): boolean {
    const logIn = this.loginService.booleanLoggedIn;
    if (logIn === true) {
      console.log('GUARD UNLOCKED')
      return true
    } else {
      console.log('SHALL NOT PASS')
      return false
    }
  }
}
