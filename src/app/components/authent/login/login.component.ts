import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService) { }

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
      const obsLogin = this.loginService.loginCheck().subscribe(res => {
        console.log('this is the response : ' + res)
        localStorage.setItem('token', res.headers['x-access-token'])
        this.routeProtected();
        obsLogin.unsubscribe();
      });
    }
  }

  routeProtected() {
    const protectToken = this.loginService.routeProtection().subscribe(res => {
      console.log('the protect route is called : ' + res)
      protectToken.unsubscribe();

    });
  }
  
}
