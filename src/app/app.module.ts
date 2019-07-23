import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PizzaPageComponent } from './pages/pizza-page/pizza-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeOrderPageComponent } from './pages/home-order-page/home-order-page.component';

import { PizzasFormAdminComponent } from './components/admin/pizzas-form-admin/pizzas-form-admin.component';
import { PizzasFormComponent } from './components/userForm/pizzas-form/pizzas-form.component';
import { BeveragesFormComponent } from './components/userForm/beverages-form/beverages-form.component';
import { DessertsFormComponent } from './components/userForm/desserts-form/desserts-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { Navbar2Component } from './components/navbar2/navbar2.component';
import { BasketComponent } from './components/basket/basket.component';
import { BeveragesFormAdminComponent } from './components/admin/beverages-form-admin/beverages-form-admin.component';
import { AuthClientPageComponent } from './pages/authent/auth-client-page/auth-client-page.component';
import { LoginComponent } from './components/authent/login/login.component';
import { AuthentCreateComponent } from './components/authent/authent-create/authent-create.component';
import { SaladsFormComponent } from './components/userForm/salads-form/salads-form.component';
import { HomeOrderComponent } from './components/home-order/home-order.component';
import { HomeComponent } from './components/home/home.component';
import { SaladPageComponent } from './pages/salad-page/salad-page.component';
import { OnlyLoggedInUsersGuardService } from './services/only-logged-in-users-guard.service';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { SaladToppingsFormAdminComponent } from './components/salad-toppings-form-admin/salad-toppings-form-admin.component';
import { SaladIngredientsFormAdminComponent } from './components/salad-ingredients-form-admin/salad-ingredients-form-admin.component';
import { SaladBaseFormAdminComponent } from './components/salad-base-form-admin/salad-base-form-admin.component';
import { SaladSaucesFormAdminComponent } from './components/salad-sauces-form-admin/salad-sauces-form-admin.component';
import { MenuPizzaFormComponent } from './components/userForm/menu-pizza-form/menu-pizza-form.component';
import { DessertsFormAdminComponent } from './components/admin/desserts-form-admin/desserts-form-admin.component';
import { DetailOrderPageComponent } from './pages/detail-order-page/detail-order-page.component';
import { DetailOrderComponent } from './components/detail-order/detail-order.component';
import { MenuSaladFormComponent } from './components/userForm/menu-salad-form/menu-salad-form.component';
import { CreateAccountPageComponent } from './pages/authent/create-account-page/create-account-page.component';
import { UserAccountPageComponent } from './pages/user-account-page/user-account-page.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ForgotPsswComponent } from './components/authent/forgot-pssw/forgot-pssw.component';
import { ForgotPsswPageComponent } from './pages/authent/forgot-pssw-page/forgot-pssw-page.component';
import { NewPasswordPageComponent } from './pages/new-password-page/new-password-page.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { NewPasswordPageGuardService } from './services/new-password-page-guard.service';
import { AdminSuperGuardService } from './services/admin-super-guard.service';
import { DetailsOrdersAdminComponent } from './components/admin/details-orders-admin/details-orders-admin.component';
import { AdminPagesComponent } from './pages/admin-pages-component/admin-pages-component';
import { DetailsOrdersArchivedAdminComponent } from './components/admin/details-orders-archived-admin/details-orders-archived-admin.component';
import { UserAccountManageComponent } from './components/authent/user-account-manage/user-account-manage.component';

@NgModule({
  declarations: [
    AppComponent,
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
    BeveragesFormAdminComponent,
    AuthClientPageComponent,
    LoginComponent,
    AuthentCreateComponent,
    SaladsFormComponent,
    HomeOrderComponent,
    HomeComponent,
    SaladPageComponent,
    MenuPageComponent,
    MenuPizzaFormComponent,
    DessertsFormAdminComponent,
    SaladToppingsFormAdminComponent,
    SaladIngredientsFormAdminComponent,
    SaladBaseFormAdminComponent,
    SaladSaucesFormAdminComponent,
    DetailOrderPageComponent,
    DetailOrderComponent,
    MenuSaladFormComponent,
    CreateAccountPageComponent,
    UserAccountPageComponent,
    UserAccountComponent,
    ContactComponent,
    ContactPageComponent,
    ForgotPsswComponent,
    ForgotPsswPageComponent,
    NewPasswordPageComponent,
    NewPasswordComponent,
    DetailsOrdersAdminComponent,
    AdminPagesComponent,
    DetailsOrdersArchivedAdminComponent,
    UserAccountManageComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [
    OnlyLoggedInUsersGuardService,
    NewPasswordPageGuardService,
    AdminSuperGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
