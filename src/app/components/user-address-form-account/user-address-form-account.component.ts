import { Component, OnInit } from '@angular/core';
import { UserAccountInformationsService } from 'src/app/services/user-account-informations.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-address-form-account',
  templateUrl: './user-address-form-account.component.html',
  styleUrls: ['./user-address-form-account.component.scss']
})
export class UserAddressFormAccountComponent implements OnInit {

  
  authModifyAddressForm: FormGroup;
  createClientObject;
  regexPhone = /[0-9]*/m;
  regexEmail = /^[a-zA-Z0-9.%&_~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/m
  show: boolean = false;
  psswType = "password";
  regexZipcode = /[0-9]*/m;
  userAccountAddressObject;

  constructor(
    private fb: FormBuilder,
    private userAccountInformationsService: UserAccountInformationsService
  ) { }

  ngOnInit() {
    this.initForm();
    if (localStorage.getItem('userMail') !== undefined) {
      this.userAccountInformationsService.userMail = localStorage.getItem('userMail');
      this.userAccountInformationsService.getClientAccountInfos().then(res => {
        const userAccountAddressObject = JSON.parse(res);
        this.authModifyAddressForm.patchValue({
          address1: userAccountAddressObject[1].userAddress1,
          address2: userAccountAddressObject[1].userAddress2,
          zipcode: userAccountAddressObject[1].zipcode,
          city: userAccountAddressObject[1].city,
          userAddressFacturation: userAccountAddressObject[1].userAddressFacturation
        });
    });
    }
  }

  get fC() { return this.authModifyAddressForm.controls; }

  initForm() {
    this.authModifyAddressForm = this.fb.group({
      address1: ['', [Validators.minLength(4), Validators.maxLength(255)]],
      address2: ['', [Validators.minLength(4), Validators.maxLength(255)]],
      zipcode: ['', [Validators.minLength(5), Validators.maxLength(5), Validators.pattern(this.regexZipcode)]],
      city: ['', [Validators.minLength(2), Validators.maxLength(255)]],
      userAddressFacturation: ['', [Validators.minLength(2), Validators.maxLength(255)]]
    });
  }

  onSubmitModifyUserAddressForm() {
    if (this.authModifyAddressForm.valid) {
      for (let value of Object.entries(this.authModifyAddressForm.value)) {
        if (value[1] != '') {
          this.userAccountInformationsService.userAccountAddressObject[0][`${value[0]}`] = value[1]
        } else {
          delete this.userAccountInformationsService.userAccountAddressObject[0][`${value[0]}`]
        };
      }
      if (confirm(`Êtes-vous sûr de modifier ces informations ?`)) {
        this.userAccountInformationsService.putClientAccountInfos().then(_ => {
          location.reload()
        });
      }
    };
  }
}
