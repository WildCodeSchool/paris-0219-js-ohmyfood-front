import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { DessertsFormComponent } from './components/desserts-form/desserts-form.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { PizzaPageComponent } from './pages/pizza-page/pizza-page.component';
import { PizzaComponent } from './components/pizza/pizza.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PizzasFormComponent } from './components/pizzas-form/pizzas-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DessertsFormComponent,
    PizzaComponent,
    PizzaPageComponent,
    PizzasFormComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
