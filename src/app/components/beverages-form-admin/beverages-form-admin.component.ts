import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BeverageService } from 'src/app/services/beverage.service';

@Component({
  selector: 'app-beverages-form-admin',
  templateUrl: './beverages-form-admin.component.html',
  styleUrls: ['./beverages-form-admin.component.scss']
})
export class BeveragesFormAdminComponent implements OnInit {

  regexPrice = /[0-9{1,3}]+[.]+[0-9]{2}/gm;
  beverageFormObject;
  beverageForm: FormGroup;

  constructor(private beverageService: BeverageService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() { return this.beverageForm.controls; }

  initForm() {
    this.beverageForm = this.fb.group({
      bevName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
      bevPriceHt: ['', [Validators.required, Validators.pattern(this.regexPrice)]]
    });
  }

  onSubmit() {
    if (this.beverageForm.valid) {
      this.beverageService.beverageFormObject = {
        bevName: this.beverageForm.value.bevName,
        bevPriceHt: parseFloat(this.beverageForm.value.bevPriceHt),
        idTax: 1
      };
      const addBeverageType = this.beverageService.addPizzaType().subscribe(_ => {
        this.beverageForm.reset();
        addBeverageType.unsubscribe();
      });
    }
  }
}