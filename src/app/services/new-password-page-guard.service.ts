import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { ForgotPasswordService } from './forgot-password.service';

@Injectable({
  providedIn: 'root'
})
export class NewPasswordPageGuardService implements CanActivate {
  userToken = window.location.pathname.split('/')[2];
  booleanGuard = false;

  constructor(
    private forgetPasswordService: ForgotPasswordService, 
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  canActivate(): boolean {
    this.forgetPasswordService.requestPasswordObject = {
      token: this.userToken
    }

    if (sessionStorage.getItem('tokenPssw') == undefined) {
      this.forgetPasswordService.compareTokens().then(res => {
        console.log('truc', res['token'])
        if (res['token'].length === 0 ) {
          this.booleanGuard = false;
        } else {
          this.booleanGuard = true;
          sessionStorage.setItem('tokenPssw', this.userToken)
          this.router.navigate([`TzApeyaNpBzRJmGrit59K4NJ5Cy/${res['token']}`]); 
        }      
      })
    }

    if(sessionStorage.getItem('tokenPssw') != undefined) {
      return true
    } else {
      return false
    }
  }
}
