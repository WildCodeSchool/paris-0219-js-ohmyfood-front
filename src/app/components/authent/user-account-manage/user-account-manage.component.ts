import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { checkUserPassword } from 'src/app/validators/checkUserPassword';
import { UserAccountInformationsService } from 'src/app/services/user-account-informations.service';

@Component({
  selector: 'app-user-account-manage',
  templateUrl: './user-account-manage.component.html',
  styleUrls: ['./user-account-manage.component.scss']
})
export class UserAccountManageComponent implements OnInit {

  authModifyForm: FormGroup;
  createClientObject;
  regexPhone = /[0-9]*/gm;
  regexEmail = /^[a-zA-Z0-9.%&_~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gm
  show: boolean = false;
  psswType = "password";
  regexZipcode = /[0-9]*/gm;
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
        phone: `0${userAccountObject[0].phoneNumber}`,
        address1 : userAccountObject[1].userAddress1,
        address2 : userAccountObject[1].userAddress2,
        zipcode : userAccountObject[1].zipcode,
        city: userAccountObject[1].city,
        userFacturation: userAccountObject[1].userAddressFacturation
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
      psswVerif: [''],
      address1: ['', [Validators.minLength(4), Validators.maxLength(255)]],
      address2: ['', [Validators.minLength(4), Validators.maxLength(255)]],
      zipcode: ['', [Validators.minLength(5), Validators.maxLength(5), Validators.pattern(this.regexZipcode)]],
      city: ['', [Validators.minLength(2), Validators.maxLength(255)]],
      userAddressFacturation: ['', [Validators.minLength(2), Validators.maxLength(255)]]
    },
    {
      validator: checkUserPassword('pssw', 'psswVerif')
    })
  }

  onSubmitCreateClientForm() {
    if (this.authModifyForm.valid) {
      this.userAccountInformationsService.userAccountObject = {
        '0': {
          lastname: this.authModifyForm.value.lastName,
          firstname: this.authModifyForm.value.firstName,
          mail: this.authModifyForm.value.email,
          password: this.authModifyForm.value.pssw,
          phoneNumber: this.authModifyForm.value.phone
        },
        '1': {
          userAddress1: this.authModifyForm.value.address1,
          userAddress2: this.authModifyForm.value.address2,
          zipcode: this.authModifyForm.value.zipcode,
          city: this.authModifyForm.value.city,
          userAddressFacturation: this.authModifyForm.value.userFacturation
        }
      };
      if (confirm(`Êtes-vous sûr de soumettre ces informations ?`)) {
        this.userAccountInformationsService.putClientAccountInfos().then(_ => {
          /*this.userAccountInformationsService.getClientAccountInfos().then(res => {
            const userAccountObject = JSON.parse(res);
            this.authModifyForm.patchValue({
              lastName: userAccountObject[0].lastname,
              firstName:userAccountObject[0].firstname,
              email: userAccountObject[0].mail,
              phone: `0${userAccountObject[0].phoneNumber}`,
              address1 : userAccountObject[1].userAddress1,
              address2 : userAccountObject[1].userAddress2,
              zipcode : userAccountObject[1].zipcode,
              city: userAccountObject[1].city,
              userAddressFacturation: userAccountObject[1].userAddressFacturation
            });
          });*/
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
