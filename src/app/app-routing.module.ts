import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PizzaPageComponent } from './pages/pizza-page/pizza-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeOrderPageComponent } from './pages/home-order-page/home-order-page.component';
import { AdminPagesComponent } from './pages/admin-pages/admin-pages.component';
import { AuthClientPageComponent } from './pages/authent/auth-client-page/auth-client-page.component';
import { SaladPageComponent } from './pages/salad-page/salad-page.component';
import { OnlyLoggedInUsersGuardService } from './services/only-logged-in-users-guard.service';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { DetailOrderPageComponent } from './pages/detail-order-page/detail-order-page.component';
import { CreateAccountPageComponent } from './pages/authent/create-account-page/create-account-page.component';
import { UserAccountPageComponent } from './pages/user-account-page/user-account-page.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'homePage',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminPagesComponent,
    canActivate: [OnlyLoggedInUsersGuardService]
  },
  {
    path: 'homePage',
    component: HomePageComponent
  },
  {
    path: 'homeOrderPage',
    component: HomeOrderPageComponent,
    canActivate: [OnlyLoggedInUsersGuardService]
  },
  {
    path: 'authClientPage',
    component: AuthClientPageComponent
  },
  {
    path: 'createAccountPage',
    component: CreateAccountPageComponent
  },
  {
    path: 'pizzaPage',
    component: PizzaPageComponent,
    canActivate: [OnlyLoggedInUsersGuardService]
  },
  {
    path: 'saladePage',
    component: SaladPageComponent,
    canActivate: [OnlyLoggedInUsersGuardService]
  },
  {
    path: 'menuPage',
    component: MenuPageComponent,
    canActivate: [OnlyLoggedInUsersGuardService]
  },
  {
    path: 'detailOrderPage',
    component: DetailOrderPageComponent,
    canActivate: [OnlyLoggedInUsersGuardService]
  },
  {
    path: 'userAccountPage',
    component: UserAccountPageComponent,
    canActivate: [OnlyLoggedInUsersGuardService]
  },
  {
    path: 'contactPage',
    component: ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
