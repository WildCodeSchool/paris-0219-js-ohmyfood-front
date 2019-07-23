import { Injectable, Output } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ForgotPasswordService } from './forgot-password.service';
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root'
})
export class NewPasswordPageGuardService implements CanActivate {
  userToken = window.location.pathname.split('/')[2];
  tokenGuard;
  getResponseNewPsswObject;

  @Output() transfertResponseNewPssw: EventEmitter = new EventEmitter;

  constructor (
    private forgetPasswordService: ForgotPasswordService,
    private router: Router
  ) { }

  transfertResponseNewPsswFn(param) {
    this.transfertResponseNewPssw.emit(param);
    this.getResponseNewPsswObject = param;
    localStorage.setItem('firstResponse', param.responseNewPssw)
  }

  canActivate(): boolean {
    this.forgetPasswordService.requestPasswordObject = {
      token: this.userToken
    }

    if (localStorage.getItem('tokenPssw') == undefined) {
      this.forgetPasswordService.compareTokens().then(res => {
        if (res['token'].length === 0 ) {
          return
        } else {
          this.tokenGuard = res['token'];
          localStorage.setItem('response', res['response'])
          localStorage.setItem('tokenPssw', this.userToken);
          this.router.navigate([`TzApeyaNpBzRJmGrit59K4NJ5Cy/${res['token']}`]); 
        }
      });
    }

    if(localStorage.getItem('tokenPssw') != undefined) {
      if (localStorage.getItem('tokenPssw') == this.tokenGuard && localStorage.getItem('response') == localStorage.getItem('firstResponse')) {
        return true
      } else {
        this.router.navigateByUrl('/');
        return false
      }
    } else {
      return false
    }
  }
}
