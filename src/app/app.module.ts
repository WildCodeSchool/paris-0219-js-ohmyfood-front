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

import { PizzaComponent } from './components/pizza/pizza.component';
import { PizzasFormComponent } from './components/pizzas-form/pizzas-form.component';
import { BeveragesFormComponent } from './components/beverages-form/beverages-form.component';
import { DessertsFormComponent } from './components/desserts-form/desserts-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { SaladsSaucesComponent } from './components/salads-sauces/salads-sauces.component';
import { Routes, RouterModule } from '@angular/router';
import { Navbar2Component } from './components/navbar2/navbar2.component';

@NgModule({
  declarations: [
    AppComponent,
    SaladsSaucesComponent,
    SaladsSaucesPageComponent,
    DessertsFormComponent,
    PizzaComponent,
    PizzaPageComponent,
    PizzasFormComponent,
    HomePageComponent,
    HomeOrderPageComponent,
    BeveragesFormComponent,
    FooterComponent,
    Navbar2Component
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
