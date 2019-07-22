import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class OnlyLoggedInUsersGuardService implements CanActivate {
  tokenGuard = '';
  alreadyLogged;
  routeProtectedDone = false;
  constructor(
    private router: Router, 
    private loginService: LoginService
  ) {}

  canActivate(): boolean {
    if (sessionStorage.getItem('alreadyLogged') != undefined) {
      this.loginService.routeProtection().then(_ => {
        this.router.navigateByUrl(`${location.pathname}`);
      });
    }

    if(this.tokenGuard != undefined && this.alreadyLogged == undefined) {
      sessionStorage.setItem('alreadyLogged', 'alreadyLogged');
      return true
    } else {
      return false
    }
  }
}
