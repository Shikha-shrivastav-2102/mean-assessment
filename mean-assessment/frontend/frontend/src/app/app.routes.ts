import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login';

import { RegisterComponent } from './components/register/register';

import { DashboardComponent } from './components/dashboard/dashboard';

import { ProductListComponent } from './components/product-list/product-list';

import { ProductFormComponent } from './components/product-form/product-form';

import { Order } from './components/order/order';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },

  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [authGuard]
  },

  {
    path: 'products/add',
    component: ProductFormComponent,
    canActivate: [authGuard]
  },

  {
    path: 'products/edit/:id',
    component: ProductFormComponent,
    canActivate: [authGuard]
  },

  {
    path: 'orders',
    component: Order,
    canActivate: [authGuard]
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];