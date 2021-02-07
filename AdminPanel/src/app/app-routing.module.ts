import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrderComponent } from './create-order/create-order.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: 'login',
    component:LoginPageComponent,
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthService]
  },
  {
    path: 'orders-list',
    component: OrdersListComponent,
    canActivate: [AuthService]
  },
  {
    path: 'order-detail/:id',
    component: OrderDetailComponent,
    canActivate: [AuthService]
  },

  {
    path: 'create-order',
    component: CreateOrderComponent,
    canActivate: [AuthService]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
