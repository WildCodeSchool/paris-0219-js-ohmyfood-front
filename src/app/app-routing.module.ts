import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsLogged } from '../app/services/IsLogged.service';
import { PizzaPageComponent } from './pages/pizza-page/pizza-page.component';
import { SaladsSaucesPageComponent } from './pages/salads-sauces-page/salads-sauces-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeOrderPageComponent } from './pages/home-order-page/home-order-page.component';
import { AdminPagesComponent } from './pages/admin-pages/admin-pages.component';
import { AuthClientPageComponent } from './pages/authent/auth-client-page/auth-client-page.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'homePage', pathMatch: 'full'
  },
  {
    path: 'admin', 
    component: AdminPagesComponent,
    canActivate: [IsLogged]
  },
  {
    path: 'homePage',
    component: HomePageComponent
  },
  {
    path: 'homeOrderPage',
    component: HomeOrderPageComponent,
    canActivate: [IsLogged]
  },
  {
    path: 'authClientPage',
    component: AuthClientPageComponent
  },
  {
    path: 'pizzaPage',
    component: PizzaPageComponent,
    canActivate: [IsLogged]
  },
  {
    path: 'salades-sauce',
    component: SaladsSaucesPageComponent,
    canActivate: [IsLogged]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
