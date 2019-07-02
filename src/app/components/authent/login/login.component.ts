import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { OnlyLoggedInUsersGuardService } from 'src/app/services/only-logged-in-users-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private loginService: LoginService,
    private router: Router,
    private onlyLoggedInUsersGuardService: OnlyLoggedInUsersGuardService ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      emailClient: ['', [Validators.required, Validators.email, Validators.minLength(4)]],
      psswClient: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]]
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.loginObject = {
        mail: this.loginForm.value.emailClient,
        password: this.loginForm.value.psswClient
      }
      this.loginService.loginCheck().then(res => {
        localStorage.setItem('token', res)
        this.routeProtected();
      });
    }
  }

  routeProtected() {
    this.loginService.routeProtection().then(res => {
      this.loginService.booleanLoggedIn = true;
      this.loginService.getClientInformation().then(res => {
        const userInfoObject = {
          lastname: res['0'].lastname,
          firstname: res['0'].firstname,
          mail: res['0'].mail
        }
        localStorage.setItem('userLastName', userInfoObject.lastname);
        localStorage.setItem('userFirstName', userInfoObject.firstname);
        localStorage.setItem('userMail', userInfoObject.mail);
        this.loginService.transfertUserFn(userInfoObject);
        this.router.navigateByUrl('homeOrderPage');
      });
    });
  }
  
}
