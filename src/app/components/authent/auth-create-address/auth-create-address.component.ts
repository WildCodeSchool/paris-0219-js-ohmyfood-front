import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthCreateClientService } from 'src/app/services/auth-create-client.service';

@Component({
  selector: 'app-auth-create-address',
  templateUrl: './auth-create-address.component.html',
  styleUrls: ['./auth-create-address.component.scss']
})
export class AuthCreateAddressComponent implements OnInit {
  authCreateAddressForm: FormGroup;
  createClientAddressObject;
  regexZipcode = /[0-9]*/gm;

  constructor(private fb: FormBuilder, private authCreateClientService: AuthCreateClientService) { }

  ngOnInit() {
    this.initForm();
  }

  get fCA () { return this.authCreateAddressForm.controls }

  initForm() {
    this.authCreateAddressForm = this.fb.group({
      address1: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
      address2: ['', [Validators.minLength(4), Validators.maxLength(255)]],
      zipcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern(this.regexZipcode)]],
      city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      userFacturation: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]]
    })
  }

  onSubmitCreateClientForm() {
    if (this.authCreateAddressForm.valid) {
      this.authCreateClientService.createClientObject = {
        address1: this.authCreateAddressForm.value.address1,
        address2: this.authCreateAddressForm.value.address2,
        zipcode: this.authCreateAddressForm.value.zipcode,
        city: this.authCreateAddressForm.value.city,
        idUsers: '',
        userFacturation: this.authCreateAddressForm.value.userFacturation
      };
      if (confirm(`Êtes-vous sûr de soumettre ces informations ?`)) {
        const addClientAddress = this.authCreateClientService.addClientAddress().subscribe(_ => {
          this.authCreateAddressForm.reset();
          addClientAddress.unsubscribe();
        });
      }
    }
  }
}
