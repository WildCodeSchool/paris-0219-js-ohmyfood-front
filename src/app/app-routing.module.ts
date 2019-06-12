import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PizzaPageComponent } from './pages/pizza-page/pizza-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pizzaPage', 
    pathMatch: 'full'
  },
  {
    path: 'pizzaPage',
    component: PizzaPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
