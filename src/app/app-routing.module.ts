import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PizzaPageComponent } from './pages/pizza-page/pizza-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeOrderPageComponent } from './pages/home-order-page/home-order-page.component';
import { AdminPagesComponent } from './pages/admin-pages/admin-pages.component';
import { AuthClientPageComponent } from './pages/authent/auth-client-page/auth-client-page.component';
import { SaladsFormComponent } from './components/salads-form/salads-form.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'homePage', pathMatch: 'full'
  },
  {
    path: 'admin', component: AdminPagesComponent
  },
  {
    path: 'homePage',
    component: HomePageComponent
  },
  {
    path: 'homeOrderPage',
    component: HomeOrderPageComponent
  },
  {
    path: 'authClientPage',
    component: AuthClientPageComponent
  },
  {
    path: 'pizzaPage',
    component: PizzaPageComponent
  },
  {
    path: 'salades',
    component: SaladsFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
