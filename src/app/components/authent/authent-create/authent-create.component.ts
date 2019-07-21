import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthCreateClientService } from 'src/app/services/auth-create-client.service';
import { checkUserPassword } from 'src/app/validators/checkUserPassword';

@Component({
  selector: 'app-authent-create',
  templateUrl: './authent-create.component.html',
  styleUrls: ['./authent-create.component.scss']
})
export class AuthentCreateComponent implements OnInit {
  authCreateForm: FormGroup;
  createClientObject;
  regexPhone = /[0-9]*/gm;
  regexEmail = /^[a-zA-Z0-9.%&_~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gm
  show: boolean = false;
  psswType = "password";
  regexZipcode = /[0-9]*/gm;

  constructor(private fb: FormBuilder, private authCreateClientService: AuthCreateClientService) { }

  ngOnInit() {
    this.initForm();
  }

  get fC() { return this.authCreateForm.controls; }

  initForm() {
    this.authCreateForm = this.fb.group({
      lastName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
      firstName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
      email: ['', [Validators.required, Validators.pattern(this.regexEmail), Validators.minLength(4)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.regexPhone)]],
      pssw: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]],
      psswVerif: ['', Validators.required],
      address1: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
      address2: ['', [Validators.minLength(4), Validators.maxLength(255)]],
      zipcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern(this.regexZipcode)]],
      city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      userFacturation: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]]
    },
    {
      validator: checkUserPassword('pssw', 'psswVerif')
    });
  }

  onSubmitCreateClientForm() {
    if (this.authCreateForm.valid) {
      this.authCreateClientService.createClientObject = {
        '0': {
          lastname: this.authCreateForm.value.lastName,
          firstname: this.authCreateForm.value.firstName,
          mail: this.authCreateForm.value.email,
          password: this.authCreateForm.value.pssw,
          phoneNumber: this.authCreateForm.value.phone,
          forgotPassword: "",
          userRight: 0
        },
        '1': {
          userAddress1: this.authCreateForm.value.address1,
          userAddress2: this.authCreateForm.value.address2,
          zipcode: this.authCreateForm.value.zipcode,
          city: this.authCreateForm.value.city,
          idUsers:'',
          userFacturation: 0,
          userAddressFacturation: this.authCreateForm.value.userFacturation,
        }
      };
      if (confirm(`Êtes-vous sûr de soumettre ces informations ?`)) {
        const addClient = this.authCreateClientService.addClient().subscribe(_ => {
          this.authCreateForm.reset();
          addClient.unsubscribe();
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
