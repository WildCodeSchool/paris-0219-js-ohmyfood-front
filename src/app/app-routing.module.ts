import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PizzaPageComponent } from './pages/pizza-page/pizza-page.component';
import { SaladsSaucesPageComponent } from './pages/salads-sauces-page/salads-sauces-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeOrderPageComponent } from './pages/home-order-page/home-order-page.component';

const routes: Routes = [
  {
    path:'homePage',
    component: HomePageComponent
  },
  {
    path:'homeOrderPage',
    component: HomeOrderPageComponent
  },
  {
    path: 'pizzaPage',
    component: PizzaPageComponent
  },
  {
    path: 'salades-sauce',
    component: SaladsSaucesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
