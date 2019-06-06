import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PizzaPageComponent } from './pages/pizza-page/pizza-page.component';
import { SaladsSaucesPageComponent } from './pages/salads-sauces-page/salads-sauces-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'salades-sauce',
    pathMatch: 'full'
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
