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

  constructor(
    private router: Router, 
    private forgotPasswordService: ForgotPasswordService,
    private location: Location
  ) { }

  ngOnInit() {
    this.verifiedToken();
  }

  verifiedToken() {
    this.forgotPasswordService.requestPasswordObject = {
      token: this.userToken
    }
    this.forgotPasswordService.compareTokens().subscribe(_ => {
      this.forgotPasswordService.booleanGuard = 1;
      this.location.reload();
    });
  }

}
