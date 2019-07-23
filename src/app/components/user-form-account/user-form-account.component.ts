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
  psswType = "password";
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
          email: userAccountObject[0].mail,
          phone: `0${userAccountObject[0].phoneNumber}`
        });
      });
    }
  }

  get fC() { return this.authModifyForm.controls; }

  initForm() {
    this.authModifyForm = this.fb.group({
      lastName: ['', [Validators.minLength(4), Validators.maxLength(45)]],
      firstName: ['', [Validators.minLength(4), Validators.maxLength(45)]],
      email: ['', [Validators.pattern(this.regexEmail), Validators.minLength(4)]],
      phone: ['', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.regexPhone)]],
      pssw: ['', [Validators.minLength(7), Validators.maxLength(15)]],
      psswVerif: ['']
    },
    {
      validator: checkUserPassword('pssw', 'psswVerif')
    })
  }

  onSubmitModifyUserForm() {
    if (this.authModifyForm.valid) {
      this.userAccountInformationsService.userAccountObject = {
          lastname: this.authModifyForm.value.lastName,
          firstname: this.authModifyForm.value.firstName,
          mail: this.authModifyForm.value.email,
          password: this.authModifyForm.value.pssw,
          phoneNumber: this.authModifyForm.value.phone
      };
      if (confirm(`Êtes-vous sûr de modifier ces informations ?`)) {
        console.log(this.userAccountInformationsService.userAccountObject)
        this.userAccountInformationsService.putClientAccountInfos().then(_ => {
          location.reload()
        });
      }
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
