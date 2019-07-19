import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaxService } from 'src/app/services/tax.service';

@Component({
  selector: 'app-tax-form-admin',
  templateUrl: './tax-form-admin.component.html',
  styleUrls: ['./tax-form-admin.component.scss']
})
export class TaxFormAdminComponent implements OnInit {

  actions = ['Modifier'];
  formCheck: FormGroup;
  regexTax = /[0-9{1}]+[.]+[0-9]{3}/gm;
  taxFormObject;
  taxFormPut: FormGroup;
  tabStr = [];
  valueAction = 'Modifier';

  constructor(
    private taxService: TaxService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
    const getTaxObs = this.taxService.getTaxType().subscribe(data => {
      this.taxFormObject = data;
      getTaxObs.unsubscribe();
    });
  }

  get FM () { return this.taxFormPut.controls; }

  initForm() {
    this.taxFormPut = this.fb.group({
      taxName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(45)]],
      taxNewName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      taxMultipliedBy: ['', [Validators.required, Validators.pattern(this.regexTax)]]
    });
  }

  onSubmitPutForm() {
    if (this.taxFormPut.valid) {
      this.taxService.taxFormObject = {
        idTaxName: this.taxFormPut.value.taxName,
        taxValue: this.taxFormPut.value.taxMultipliedBy
      };
      if (this.taxFormPut.value.taxNewName !== '') {
        this.taxService.taxFormObject.idTaxName += '|' + this.toJadenCase(this.taxFormPut.value.taxNewName)
      }
      if (confirm(`Êtes-vous certain de modifier la tax ${this.taxFormPut.value.taxName}`)) {
        const putTaxType = this.taxService.putTaxType().subscribe(_ => {
          const getTaxObs = this.taxService.getTaxType().subscribe(data => {
            this.taxFormObject = data;
            getTaxObs.unsubscribe();
          })
          this.taxFormPut.reset();
          putTaxType.unsubscribe();
        });
      }
    }
  }

  toJadenCase(strin) {
    this.tabStr = strin.split(' ');
    this.tabStr = this.tabStr.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return this.tabStr.join(' ');
  }

}
