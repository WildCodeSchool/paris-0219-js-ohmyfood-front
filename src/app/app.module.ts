import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PizzaPageComponent } from './pages/pizza-page/pizza-page.component';
import { SaladsSaucesPageComponent } from './pages/salads-sauces-page/salads-sauces-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeOrderPageComponent } from './pages/home-order-page/home-order-page.component';

import { PizzasFormAdminComponent } from './components/pizzas-form-admin/pizzas-form-admin.component';
import { PizzasFormComponent } from './components/pizzas-form/pizzas-form.component';
import { BeveragesFormComponent } from './components/beverages-form/beverages-form.component';
import { DessertsFormComponent } from './components/desserts-form/desserts-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { SaladsSaucesComponent } from './components/salads-sauces/salads-sauces.component';
import { RouterModule } from '@angular/router';
import { Navbar2Component } from './components/navbar2/navbar2.component';
import { BasketComponent } from './components/basket/basket.component';
import { AdminPagesComponent } from './pages/admin-pages/admin-pages.component';
import { BeveragesFormAdminComponent } from './components/beverages-form-admin/beverages-form-admin.component';
import { AuthClientPageComponent } from './pages/authent/auth-client-page/auth-client-page.component';
import { AuthClientComponent } from './components/authent/auth-client/auth-client.component';
import { AuthentCreateComponent } from './components/authent/authent-create/authent-create.component';
import { AuthCreateAddressComponent } from './components/authent/auth-create-address/auth-create-address.component';
import { HomeOrderComponent } from './components/home-order/home-order.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    SaladsSaucesComponent,
    SaladsSaucesPageComponent,
    DessertsFormComponent,
    PizzasFormAdminComponent,
    PizzaPageComponent,
    PizzasFormComponent,
    HomePageComponent,
    HomeOrderPageComponent,
    BeveragesFormComponent,
    FooterComponent,
    Navbar2Component,
    BasketComponent,
    AdminPagesComponent,
    BeveragesFormAdminComponent,
    AuthClientPageComponent,
    AuthClientComponent,
    AuthentCreateComponent,
    AuthCreateAddressComponent,
    HomeOrderComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
