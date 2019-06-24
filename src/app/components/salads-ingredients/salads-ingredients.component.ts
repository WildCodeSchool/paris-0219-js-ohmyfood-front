import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SaladsDatasService } from 'src/app/services/salads-datas.service';
import { QuantitySelectService } from 'src/app/services/quantity-select.service';

@Component({
  selector: 'app-salads-ingredients',
  templateUrl: './salads-ingredients.component.html',
  styleUrls: ['./salads-ingredients.component.scss']
})
export class SaladsIngredientsComponent implements OnInit {
saladsIngredientsFormTable;
saladsIngredientsForm: FormGroup;
isToggle = false;

// Enable submit button
enableSubmit: boolean;

constructor(
  private saladsDatasService: SaladsDatasService,
  private quantitySelectService: QuantitySelectService,
  private fb: FormBuilder
) {
  this.saladsIngredientsForm = this.fb.group({
    selectIngredients: ''
    });

  }

  ngOnInit() {
    this.saladsDatasService.addSaladsIngredients().subscribe(data => {
      this.saladsIngredientsFormTable = data;
    });
  }
  quantitySelect(operator, i, quantity) {
    this.saladsIngredientsForm.value.selectedDessert[i].dessQuantity = this.quantitySelectService.selectQuantity(operator, quantity);

    if (this.saladsIngredientsForm.value.selectedDessert[i].dessQuantity > 0) {
      this.enableSubmit = true;
    } else {
      this.enableSubmit = false;
    }
   }
onSubmit() {
  const orderIngredients = this.saladsIngredientsForm.value;
}

}
