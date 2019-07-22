import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { checkUserPassword } from 'src/app/validators/checkUserPassword';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  newPsswForm: FormGroup;
  show: boolean = false;
  psswType = "password";

  constructor(
    private fb: FormBuilder,
    private forgotPasswordService: ForgotPasswordService,
    private router: Router
  ) { }
  ngOnInit() {
    this.initForm()
  }

  get fNP() { return this.newPsswForm.controls; }

  initForm() {
    this.newPsswForm = this.fb.group({
      firstPssw: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]],
      secondPssw: ['', Validators.required]
    }, {
      validator: checkUserPassword('firstPssw', 'secondPssw')
    });
  }

  onSubmit() {
    if(this.newPsswForm.valid) {
      this.forgotPasswordService.newPssw = {
        password: this.newPsswForm.value.firstPssw,
        forgotPassword: localStorage.getItem('tokenPssw')
      }
      this.forgotPasswordService.putNewPssw().then(_ => {
        alert('Votre mot de passe a bien été changé !');
        localStorage.removeItem('tokenPssw');
        localStorage.removeItem('response');
        localStorage.removeItem('firstResponse');
        this.router.navigateByUrl('/');
      });
    }
  }

  showPssw(event) {
    event.preventDefault()
    if (this.psswType === "password") {
      this.psswType = "text";
      this.show = true;
    } else {
      this.psswType = "password";
      this.show = false;
    }
  }

}
