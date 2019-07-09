import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SaladSaucesService } from 'src/app/services/salad-sauces.service';

@Component({
  selector: 'app-salad-sauces-form-admin',
  templateUrl: './salad-sauces-form-admin.component.html',
  styleUrls: ['./salad-sauces-form-admin.component.scss']
})
export class SaladSaucesFormAdminComponent implements OnInit {

  actions = ['Ajouter', 'Modifier', 'Retirer'];
  formCheck: FormGroup;
  regexPrice = /[0-9{1,3}]+[.]+[0-9]{2}/gm;
  sauceFormObject;
  sauceFormAdd: FormGroup;
  sauceFormPut: FormGroup;
  sauceFormDel: FormGroup;
  sauceAction = 'Ajouter';

  constructor(private saladSauceService: SaladSaucesService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get fA() { return this.sauceFormAdd.controls; }

  get fM () { return this.sauceFormPut.controls; }

  get fD () { return this.sauceFormDel.controls; }

  initForm() {
    this.formCheck = this.fb.group({
      sauceAction: ['Ajouter', Validators.required]
    })

    this.sauceFormAdd = this.fb.group({
      saucesName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
      saucesPriceHt: ['', [Validators.required, Validators.pattern(this.regexPrice)]]
    });
    this.sauceFormPut = this.fb.group({
      saucesName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
      saucesPriceHt: ['', [Validators.required, Validators.pattern(this.regexPrice)]]
    });
    this.sauceFormDel = this.fb.group({
      saucesName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
    });
  }

  onSubmitAddForm() {
    if (this.sauceFormAdd.valid) {
      this.saladSauceService.sauceFormObject = {
        sauceName: this.sauceFormAdd.value.saladsSaucesName,
        saucePriceHt: parseFloat(this.sauceFormAdd.value.saladsSaucesPriceHt),
        idTax: 1
      };
      if (confirm(`Êtes-vous certain d'ajouter la sauce ${this.sauceFormAdd.value.saladsSaucesName} ?`)) {
        const addSauceType = this.saladSauceService.addSauceType().subscribe(_ => {
          this.sauceFormAdd.reset();
          addSauceType.unsubscribe();
        });
      }
    }
  }

  onSubmitPutForm() {
    if (this.sauceFormPut.valid) {
      this.saladSauceService.sauceFormObject = {
        sauceName: this.sauceFormPut.value.saladsSaucesName,
        saucePriceHt: parseFloat(this.sauceFormPut.value.saladsSaucesPriceHt),
        idTax: 1
      };
      if (confirm(`Êtes-vous certain de modifier la sauce ${this.sauceFormPut.value.saladsSaucesName} ?`)) {
        const putSauceType = this.saladSauceService.putSauceType().subscribe(_ => {
          this.sauceFormPut.reset();
          putSauceType.unsubscribe();
        });
      }
    }
  }

  onSubmitDelForm() {
    if (this.sauceFormDel.valid) {
      this.saladSauceService.sauceFormObject = {
        sauceName: this.sauceFormDel.value.saladsSaucesName
      };
      if (confirm(`Êtes-vous certain de supprimer la sauce ${this.sauceFormDel.value.saladsToppingsName} ?`)) {
        const delSauceType = this.saladSauceService.delSauceType().subscribe(_ => {
          this.sauceFormDel.reset();
          delSauceType.unsubscribe();
        });
      }
    }
  }
}
