import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { IsLogged } from 'src/app/services/IsLogged.service';
import { Router } from '@angular/router';

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
    private isLogged: IsLogged ) { }

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
      this.isLogged.log = true;
      this.isLogged.canActivate;
      this.loginService.getClientInformation().then(res => {
        this.loginService.userInfoObject = {
          lastname: res['0'].lastname,
          firstname: res['0'].firstname,
          mail: res['0'].mail
        }
        console.log(this.loginService.userInfoObject)
      })
      this.router.navigateByUrl("/homeOrderPage");
    });
  }
  
}
