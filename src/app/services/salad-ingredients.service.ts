import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SaladIngredientsService {

  ingredientFormObject;
  url = 'http://localhost:3000/salads-ingredients';

  constructor(private http: HttpClient) { }

  addIngredientType() {
    return this.http.post(this.url, this.ingredientFormObject, { responseType: 'text' });
  }

  putIngredientType() {
    return this.http.put(this.url, this.ingredientFormObject, { responseType: 'text'});
  }

  delIngredientType() {
    return this.http.delete(`${this.url}/?saladsToppingsName=${this.ingredientFormObject.saladsIngredientsName}`, { responseType: 'text'});
  }
}
