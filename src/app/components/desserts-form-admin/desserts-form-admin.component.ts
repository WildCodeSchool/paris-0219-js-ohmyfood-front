import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DessertService } from 'src/app/services/dessert.service';

@Component({
  selector: 'app-desserts-form-admin',
  templateUrl: './desserts-form-admin.component.html',
  styleUrls: ['./desserts-form-admin.component.scss']
})
export class DessertsFormAdminComponent implements OnInit {

  actions = ['Ajouter', 'Modifier', 'Retirer'];
  formCheck: FormGroup;
  regexPrice = /[0-9{1,3}]+[.]+[0-9]{2}/gm;
  dessertFormObject;
  dessertFormAdd: FormGroup;
  dessertFormPut: FormGroup;
  dessertFormDel: FormGroup;
  valueAction = 'Ajouter';

  constructor(private dessertService: DessertService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get fA() { return this.dessertFormAdd.controls; }

  get fM () { return this.dessertFormPut.controls; }

  get fD () { return this.dessertFormDel.controls; }

  initForm() {
    this.formCheck = this.fb.group({
      dessAction: ['Ajouter', Validators.required]
    })

    this.dessertFormAdd = this.fb.group({
      dessertName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
      dessPriceHt: ['', [Validators.required, Validators.pattern(this.regexPrice)]]
    });
    this.dessertFormPut = this.fb.group({
      dessertName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
      dessPriceHt: ['', [Validators.required, Validators.pattern(this.regexPrice)]]
    });
    this.dessertFormDel = this.fb.group({
      dessertName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
    });
  }

  onSubmitAddForm() {
    if (this.dessertFormAdd.valid) {
      this.dessertService.dessertFormObject = {
        dessName: this.dessertFormAdd.value.dessertName,
        dessPriceHt: parseFloat(this.dessertFormAdd.value.dessPriceHt),
        idTax: 1
      };
      if (confirm(`Êtes-vous certain d'ajouter le dessert ${this.dessertFormAdd.value.dessertName} ?`)) {
        const addDessertType = this.dessertService.addDessertType().subscribe(_ => {
          this.dessertFormAdd.reset();
          addDessertType.unsubscribe();
        });
      }
    }
  }

  onSubmitPutForm() {
    if (this.dessertFormPut.valid) {
      this.dessertService.dessertFormObject = {
        dessName: this.dessertFormPut.value.dessertName,
        dessPriceHt: parseFloat(this.dessertFormPut.value.dessPriceHt),
        idTax: 1
      };
      if (confirm(`Êtes-vous certain de modifier le dessert ${this.dessertFormPut.value.dessertName} ?`)) {
        const putDessertType = this.dessertService.putDessertType().subscribe(_ => {
          this.dessertFormPut.reset();
          putDessertType.unsubscribe();
        });
      }
    }
  }

  onSubmitDelForm() {
    if (this.dessertFormDel.valid) {
      this.dessertService.dessertFormObject = {
        dessName: this.dessertFormDel.value.dessertName
      };
      if (confirm(`Êtes-vous certain de supprimer le dessert ${this.dessertFormDel.value.dessertName} ?`)) {
        const delDessertType = this.dessertService.delDessertType().subscribe(_ => {
          this.dessertFormDel.reset();
          delDessertType.unsubscribe();
        });
      }
    }
  }
}