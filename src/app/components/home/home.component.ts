import { PizzasDataService } from 'src/app/services/pizzas-data.service';
import { SaladsDatasService } from './../../services/salads-datas.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  saladsBaseList: object;
  saladsIngredientList: object;
  saladsToppingList: object;
  saladsSauceList: object;

  pizzasList: object;

  menuList: object;

  buttons = ['livraison', 'a emporter'];

  constructor(
    private router: Router,
    private saladsDataService: SaladsDatasService,
    private pizzasDataService: PizzasDataService
    ) { }

  ngOnInit() {
    this.saladsDataService.addSaladsBases().subscribe(bases => {
      this.saladsBaseList = bases;
    });
    this.saladsDataService.addSaladsIngredients().subscribe(ingredients => {
      this.saladsIngredientList = ingredients;
    });
    this.saladsDataService.addSaladsToppings().subscribe(toppings => {
        this.saladsToppingList = toppings;
    });
    this.saladsDataService.addSaladsSauces().subscribe(sauces => {
      this.saladsSauceList = sauces;
    });
    this.pizzasDataService.getPizzas().subscribe(pizzas => {
      this.pizzasList = pizzas;
    });

    // console.log(this.saladsIngredientsList);
  }

  checkIfUserLogged(i) {
<<<<<<< HEAD
    const index = i;
    if (sessionStorage.getItem('userLastName') === undefined) {
      return this.router.navigateByUrl('authClientPage');
=======
    let index = i;
    if (localStorage.getItem('userLastName') == undefined) {
      return this.router.navigateByUrl('authClientPage')
>>>>>>> 54272bed11a490eda24d99b753d0ff8000857b4b
    }
    if (index === 0) {
      // variable en livraison checked
    } else {
      // variable à emporter checked
    }
    this.router.navigateByUrl('homeOrderPage');
  }
  goToFooter() {
    return window.alert('Appeler le 000000');
  }
}
