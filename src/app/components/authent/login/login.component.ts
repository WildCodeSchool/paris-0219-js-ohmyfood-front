import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { UserAccountInformationsService } from '../../../services/user-account-informations.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userRight = 0;
  userIdLogged;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private userAccountService: UserAccountInformationsService
  ) { }

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
      this.userAccountService.userMail = this.loginService.loginObject['mail'];
      this.loginService.loginCheck().then(res => {
        const objRes = JSON.parse(res);
        this.userIdLogged = objRes.userId;
        if (objRes.userRight === 1) {
          this.userRight = 1;
        }
        sessionStorage.setItem('token', res.split(',')[0]+'}');
        sessionStorage.setItem('userMail', objRes.userMail);
        sessionStorage.setItem('userLastName', objRes.userLastName);
        sessionStorage.setItem('userFirstName', objRes.userFirstName);
        this.routeProtected();
      });
    }
  }

  routeProtected() {
    this.loginService.routeProtection().then(res => {
        const userInfoObject = {
          lastname: sessionStorage.getItem('userLastName'),
          firstname: sessionStorage.getItem('userFirstName'),
          mail: sessionStorage.getItem('userMail')
        }
        if (this.userRight === 1) {
          this.loginService.transfertUserRightFn(this.userRight);
        }
        this.loginService.transfertUserFn(userInfoObject);
        this.router.navigateByUrl('homeOrderPage');
    });
  }

}
