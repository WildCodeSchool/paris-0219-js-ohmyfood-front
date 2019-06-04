import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PizzaPageComponent } from './';

const routes: Routes = [
  {path:'/pizzas',
   component: PizzaPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
