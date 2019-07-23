import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserAccountInformationsService } from 'src/app/services/user-account-informations.service';
import { checkUserPassword } from 'src/app/validators/checkUserPassword';

@Component({
  selector: 'app-user-form-account',
  templateUrl: './user-form-account.component.html',
  styleUrls: ['./user-form-account.component.scss']
})
export class UserFormAccountComponent implements OnInit {

  
  authModifyForm: FormGroup;
  regexPhone = /[0-9]*/gm;
  regexEmail = /^[a-zA-Z0-9.%&_~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gm
  show: boolean = false;
  passwordType = "password";
  userAccountObject;

  constructor(
    private fb: FormBuilder,
    private userAccountInformationsService: UserAccountInformationsService
  ) { }

  ngOnInit() {
    this.initForm();
    if (localStorage.getItem('userMail') !== undefined) {
      this.userAccountInformationsService.userMail = localStorage.getItem('userMail');
      this.userAccountInformationsService.getClientAccountInfos().then(res => {
        const userAccountObject = JSON.parse(res);
        this.authModifyForm.patchValue({
          lastName: userAccountObject[0].lastname,
          firstName:userAccountObject[0].firstname,
          mail: userAccountObject[0].mail,
          phoneNumber: `0${userAccountObject[0].phoneNumber}`
        });
      });
    }
  }

  get fC() { return this.authModifyForm.controls; }

  initForm() {
    this.authModifyForm = this.fb.group({
      lastName: ['', [Validators.minLength(4), Validators.maxLength(45)]],
      firstName: ['', [Validators.minLength(4), Validators.maxLength(45)]],
      mail: ['', [Validators.pattern(this.regexEmail), Validators.minLength(4)]],
      phoneNumber: ['', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.regexPhone)]],
      password: ['', [Validators.minLength(7), Validators.maxLength(15)]],
      psswVerif: ['']
    },
    {
      validator: checkUserPassword('password', 'psswVerif')
    })
  }

  onSubmitModifyUserForm() {
    if (this.authModifyForm.valid) {
      for (let value of Object.entries(this.authModifyForm.value)) {
        if (value[1] != '') {
          this.userAccountInformationsService.userAccountObject[`${value[0]}`] = value[1]
        } else {
          delete this.userAccountInformationsService.userAccountObject[`${value[0]}`]
        };
      }
      if (confirm(`Êtes-vous sûr de modifier ces informations ?`)) {
        this.userAccountInformationsService.putClientAccountInfos().then(_ => {
          location.reload()
        });
      }
    }
  }

  showPssw(event) {
    event.preventDefault()
    if (this.passwordType === "password") {
      this.passwordType = "text";
      this.show = true;
    } else {
      this.passwordType = "password";
      this.show = false;
    }
  }

}
