import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BeverageService } from 'src/app/services/beverage.service';

@Component({
  selector: 'app-beverages-form-admin',
  templateUrl: './beverages-form-admin.component.html',
  styleUrls: ['./beverages-form-admin.component.scss']
})
export class BeveragesFormAdminComponent implements OnInit {

  actions = ['Ajouter', 'Modifier', 'Retirer'];
  formCheck: FormGroup;
  regexPrice = /[0-9{1,3}]+[.]+[0-9]{2}/gm;
  beverageFormObject;
  beverageFormAdd: FormGroup;
  beverageFormPut: FormGroup;
  beverageFormDel: FormGroup;
  valueAction = 'Ajouter';

  constructor(private beverageService: BeverageService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get fA() { return this.beverageFormAdd.controls; }

  get fM () { return this.beverageFormPut.controls; }

  get fD () { return this.beverageFormDel.controls; }

  initForm() {
    this.formCheck = this.fb.group({
      bevAction: ['Ajouter', Validators.required]
    })

    this.beverageFormAdd = this.fb.group({
      beverName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
      bevPriceHt: ['', [Validators.required, Validators.pattern(this.regexPrice)]]
    });
    this.beverageFormPut = this.fb.group({
      beverName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
      bevPriceHt: ['', [Validators.required, Validators.pattern(this.regexPrice)]]
    });
    this.beverageFormDel = this.fb.group({
      beverName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
    });
  }

  onSubmitAddForm() {
    if (this.beverageFormAdd.valid) {
      this.beverageService.beverageFormObject = {
        bevName: this.beverageFormAdd.value.beverName,
        bevPriceHt: parseFloat(this.beverageFormAdd.value.bevPriceHt),
        idTax: 1
      };
      if (confirm(`Êtes-vous certain d'ajouter la boisson ${this.beverageFormAdd.value.beverName} ?`)) {
        const addBeverageType = this.beverageService.addBeverageType().subscribe(_ => {
          this.beverageFormAdd.reset();
          addBeverageType.unsubscribe();
        });
      }
    }
  }

  onSubmitPutForm() {
    if (this.beverageFormPut.valid) {
      this.beverageService.beverageFormObject = {
        bevName: this.beverageFormPut.value.beverName,
        bevPriceHt: parseFloat(this.beverageFormPut.value.bevPriceHt),
        idTax: 1
      };
      if (confirm(`Êtes-vous certain de modifier la boisson ${this.beverageFormPut.value.beverName} ?`)) {
        const putBeverageType = this.beverageService.putBeverageType().subscribe(_ => {
          this.beverageFormPut.reset();
          putBeverageType.unsubscribe();
        });
      }
    }
  }

  onSubmitDelForm() {
    if (this.beverageFormDel.valid) {
      this.beverageService.beverageFormObject = {
        bevName: this.beverageFormDel.value.beverName
      };
      if (confirm(`Êtes-vous certain de supprimer la boisson ${this.beverageFormDel.value.beverName} ?`)) {
        const delBeverageType = this.beverageService.delBeverageType().subscribe(_ => {
          this.beverageFormDel.reset();
          delBeverageType.unsubscribe();
        });
      }
    }
  }
}