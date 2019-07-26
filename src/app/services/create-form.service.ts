import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CreateFormService {

  constructor(private fb: FormBuilder) { }

  createForm(object: any) {
  const check = Object.getOwnPropertyNames(object)[0];

  if (check === 'idPizzas') {
    const pizzasForm = this.fb.group({
      idPizzas: object.idPizzas,
      pizzDesc: object.pizzDesc,
      pizzName: object.pizzName,
      pizzPriceTTC: object.pizzPriceTTC,
      pizzQuantity: 0
      });
    return pizzasForm;

    } else if (check === 'idBeverages') {
      const beveragesForm = this.fb.group({
        idBeverages: object.idBeverages,
        bevName: object.bevName,
        bevPriceTTC: object.bevPriceTTC,
        bevQuantity: 0
        });
      return beveragesForm;

    } else if (check === 'idDesserts') {
        const dessertsForm = this.fb.group({
          idDesserts: object.idDesserts,
          dessName: object.dessName,
          dessPriceTTC: object.dessPriceTTC,
          dessQuantity: 0
        });
        return dessertsForm;
    }
  }

}
