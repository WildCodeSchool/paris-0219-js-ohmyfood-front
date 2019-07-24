import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { LoginService } from 'src/app/services/login.service';
import { NewPasswordPageGuardService } from 'src/app/services/new-password-page-guard.service';

@Component({
  selector: 'app-forgot-pssw',
  templateUrl: './forgot-pssw.component.html',
  styleUrls: ['./forgot-pssw.component.scss']
})
export class ForgotPsswComponent implements OnInit {
  forgotPsswForm: FormGroup;
  regexEmail = /^[a-zA-Z0-9.%&_~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gm

  constructor(
    private fb: FormBuilder, 
    private location: Location, 
    private loginService: LoginService,
    private newPasswordPageGuardService: NewPasswordPageGuardService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  get fP() { return this.forgotPsswForm.controls; }

  initForm() {
    this.forgotPsswForm = this.fb.group({
      userMail: ['', [Validators.required, Validators.pattern(this.regexEmail), Validators.minLength(4)]]
    })
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    if(this.forgotPsswForm.valid) {
      this.loginService.userMailNewPssw = {
        userMail: this.forgotPsswForm.value.userMail
      }
    }
    if (confirm(`Voulez-vous recevoir un lien pour changer de mot de passe ?`)) {
      this.loginService.getNewPssw().then(responseNewPssw => {
        if (responseNewPssw['responseNewPssw'] != 'firstStep' ) {
          alert (responseNewPssw['responseNewPssw']);
        } else {
          this.newPasswordPageGuardService.transfertResponseNewPsswFn(responseNewPssw);
        }
      });
    }
  }

}
