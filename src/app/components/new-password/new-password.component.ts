import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  userToken = this.router.url.split('/')[2];
  booleanToken = false;
  constructor(
    private router: Router, 
    private forgetPasswordService: ForgotPasswordService
  ) { }

  ngOnInit() {
    this.verifiedToken();
  }

  verifiedToken() {
    this.forgetPasswordService.requestPasswordObject = {
      token: this.userToken
    }
    this.forgetPasswordService.compareTokens().then(res => {
      this.booleanToken = true;
    });
  }

}
