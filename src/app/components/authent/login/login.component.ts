import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { UserAccountInformationsService } from '../../../services/user-account-informations.service'
import { Router } from '@angular/router';
import { OnlyLoggedInUsersGuardService } from 'src/app/services/only-logged-in-users-guard.service';
import { AdminSuperGuardService } from 'src/app/services/admin-super-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userRight = 0;
  userIdLogged;
  transfertToken;

  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private userAccountService: UserAccountInformationsService,
    private onlyLoggedInUsersGuardService: OnlyLoggedInUsersGuardService,
    private adminSuperGuardService: AdminSuperGuardService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      emailClient: ['', [Validators.required, Validators.email, Validators.minLength(4)]],
      psswClient: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.loginObject = {
        mail: this.loginForm.value.emailClient,
        password: this.loginForm.value.psswClient
      };
      this.userAccountService.userMail = this.loginService.loginObject[`mail`];
      this.loginService.loginCheck()
        .then(res => {
        const objRes = JSON.parse(res);

        this.userIdLogged = objRes.userId;
        localStorage.setItem('token', objRes.token);
        localStorage.setItem('userMail', objRes.userMail);
        localStorage.setItem('userLastName', objRes.userLastName);
        localStorage.setItem('userFirstName', objRes.userFirstName);
        if (objRes.userRight === 1) {
          this.userRight = 1;
          this.adminSuperGuardService.tokenGuard = objRes.token;
          localStorage.setItem('adminToken', objRes.token);
          this.adminSuperGuardService.ifLogged = 'adminLogged';
        }
        this.onlyLoggedInUsersGuardService.tokenGuard = objRes.token;
        this.routeProtected();
      })
        .catch(errors => {
          this.errorMessage = errors.error;
      });
    }
  }

  routeProtected() {
    this.loginService.routeProtection().then(res => {
        const userInfoObject = {
          lastname: localStorage.getItem('userLastName'),
          firstname: localStorage.getItem('userFirstName'),
          mail: localStorage.getItem('userMail')
        };
        if (this.userRight === 1) {
          this.loginService.transfertUserRightFn(this.userRight);
          this.adminSuperGuardService.ifLogged = 'userLogged';
          this.router.navigateByUrl('admin');
          return;
        }
        this.loginService.transfertUserFn(userInfoObject);
        this.router.navigateByUrl('homeOrderPage');
        return;
    });
  }
}
