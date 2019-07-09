import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SaladBasesService } from 'src/app/services/salad-bases.service';

@Component({
  selector: 'app-salad-base-form-admin',
  templateUrl: './salad-base-form-admin.component.html',
  styleUrls: ['./salad-base-form-admin.component.scss']
})
export class SaladBaseFormAdminComponent implements OnInit {

  actions = ['Ajouter', 'Modifier', 'Retirer'];
  formCheck: FormGroup;
  regexPrice = /[0-9{1,3}]+[.]+[0-9]{2}/gm;
  baseFormObject;
  baseFormAdd: FormGroup;
  baseFormPut: FormGroup;
  baseFormDel: FormGroup;
  baseAction = 'Ajouter';

  constructor(private saladBaseService: SaladBasesService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get fA() { return this.baseFormAdd.controls; }

  get fM () { return this.baseFormPut.controls; }

  get fD () { return this.baseFormDel.controls; }

  initForm() {
    this.formCheck = this.fb.group({
      baseAction: ['Ajouter', Validators.required]
    })

    this.baseFormAdd = this.fb.group({
      baseName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
      basesPriceHt: ['', [Validators.required, Validators.pattern(this.regexPrice)]]
    });
    this.baseFormPut = this.fb.group({
      baseName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
      toppingPriceHt: ['', [Validators.required, Validators.pattern(this.regexPrice)]]
    });
    this.baseFormDel = this.fb.group({
      baseName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
    });
  }

  onSubmitAddForm() {
    if (this.baseFormAdd.valid) {
      this.saladBaseService.baseFormObject = {
        baseName: this.baseFormAdd.value.saladsBaseName,
        basePriceHt: parseFloat(this.baseFormAdd.value.saladsBasePriceHt),
        idTax: 1
      };
      if (confirm(`Êtes-vous certain d'ajouter la base ${this.baseFormAdd.value.saladsBaseName} ?`)) {
        const addBaseType = this.saladBaseService.addBaseType().subscribe(_ => {
          this.baseFormAdd.reset();
          addBaseType.unsubscribe();
        });
      }
    }
  }

  onSubmitPutForm() {
    if (this.baseFormPut.valid) {
      this.saladBaseService.baseFormObject = {
        baseName: this.baseFormPut.value.saladsBaseName,
        basePriceHt: parseFloat(this.baseFormPut.value.saladsBasePriceHt),
        idTax: 1
      };
      if (confirm(`Êtes-vous certain de modifier la base ${this.baseFormPut.value.saladsBaseName} ?`)) {
        const putBaseType = this.saladBaseService.putBaseType().subscribe(_ => {
          this.baseFormPut.reset();
          putBaseType.unsubscribe();
        });
      }
    }
  }

  onSubmitDelForm() {
    if (this.baseFormDel.valid) {
      this.saladBaseService.baseFormObject = {
        baseName: this.baseFormDel.value.saladsBaseName
      };
      if (confirm(`Êtes-vous certain de supprimer la base ${this.baseFormDel.value.saladsBaseName} ?`)) {
        const delBaseType = this.saladBaseService.delBaseType().subscribe(_ => {
          this.baseFormDel.reset();
          delBaseType.unsubscribe();
        });
      }
    }
  }
}
