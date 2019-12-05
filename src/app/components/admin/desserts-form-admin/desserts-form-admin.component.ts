import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DessertService } from 'src/app/services/dessert.service';
import { DessertsDataService } from 'src/app/services/desserts-data.service';

@Component({
  selector: 'app-desserts-form-admin',
  templateUrl: './desserts-form-admin.component.html',
  styleUrls: ['./desserts-form-admin.component.scss']
})
export class DessertsFormAdminComponent implements OnInit {

  actions = ['Ajouter', 'Modifier', 'Retirer'];
  formCheck: FormGroup;
  regexPrice = /[0-9{1,3}]+[.]+[0-9]{2}/m;
  dessertFormObject;
  dessertDataObject;
  dessertFormAdd: FormGroup;
  dessertFormPut: FormGroup;
  dessertFormDel: FormGroup;
  valueAction = 'Ajouter';

  tabStr = [];

  constructor(
    private dessertService: DessertService,
    private fb: FormBuilder,
    private dessertDataService: DessertsDataService
  ) { }

  ngOnInit() {
    this.initForm();
    const getDessertObs = this.dessertDataService.getDesserts().subscribe(data => {
      this.dessertDataObject = data;
      getDessertObs.unsubscribe();
    });
  }

  // convenience getter for easy access to form fields
  get fA() { return this.dessertFormAdd.controls; }

  get fM () { return this.dessertFormPut.controls; }

  get fD () { return this.dessertFormDel.controls; }

  initForm() {
    this.formCheck = this.fb.group({
      dessAction: ['Ajouter', Validators.required]
    });

    this.dessertFormAdd = this.fb.group({
      dessName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
      dessPriceHt: ['', [Validators.required, Validators.pattern(this.regexPrice)]]
    });
    this.dessertFormPut = this.fb.group({
      dessName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
      dessNewName: [''],
      dessPriceHt: ['', [Validators.pattern(this.regexPrice)]]
    });
    this.dessertFormDel = this.fb.group({
      dessName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
    });
  }

  onSubmitAddForm() {
    if (this.dessertFormAdd.valid) {
      this.dessertService.dessertFormObject = {
        dessName: this.dessertFormAdd.value.dessName,
        dessPrice_ht: parseFloat(this.dessertFormAdd.value.dessPriceHt),
        idTax: 1
      };
      if (confirm(`Êtes-vous certain d'ajouter le dessert ${this.dessertFormAdd.value.dessName} ?`)) {
        const addDessertType = this.dessertService.addDessertType().subscribe(_ => {
          const getDessertObs = this.dessertDataService.getDesserts().subscribe(data => {
            this.dessertDataObject = data;
            getDessertObs.unsubscribe();
          });
          this.dessertFormAdd.reset();
          addDessertType.unsubscribe();
        });
      }
    }
  }

  onSubmitPutForm() {
    if (this.dessertFormPut.valid) {
      this.dessertService.dessertFormObject = {
        dessName: this.toJadenCase(this.dessertFormPut.value.dessName),
        idTax: 1
      };

      if (this.dessertFormPut.value.dessNewName !==  '' && this.dessertFormPut.value.dessNewName !== null ) {
        this.dessertService.dessertFormObject.dessName += '|' + this.toJadenCase(this.dessertFormPut.value.dessNewName);
      }

      if (this.dessertFormPut.value.dessPriceHt !== '' && this.dessertFormPut.value.dessPriceHt !== null) {
        this.dessertService.dessertFormObject.dessPrice_Ht = parseFloat(this.dessertFormPut.value.dessPriceHt);
      }
      if (confirm(`Êtes-vous certain de modifier le dessert ${this.dessertFormPut.value.dessName} ?`)) {
        const putDessertType = this.dessertService.putDessertType().subscribe(_ => {
          const getDessertObs = this.dessertDataService.getDesserts().subscribe(data => {
            this.dessertDataObject = data;
            getDessertObs.unsubscribe();
          });
          this.dessertFormPut.reset();
          putDessertType.unsubscribe();
        });
      }
    }
  }

  onSubmitDelForm() {
    if (this.dessertFormDel.valid) {
      this.dessertService.dessertFormObject = {
        dessName: this.dessertFormDel.value.dessName
      };
      if (confirm(`Êtes-vous certain de supprimer le dessert ${this.dessertFormDel.value.dessName} ?`)) {
        const delDessertType = this.dessertService.delDessertType().subscribe(_ => {
          const getDessertObs = this.dessertDataService.getDesserts().subscribe(data => {
            this.dessertDataObject = data;
            getDessertObs.unsubscribe();
          });
          this.dessertFormDel.reset();
          delDessertType.unsubscribe();
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
