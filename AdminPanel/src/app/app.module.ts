import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';



import { LoginPageComponent } from './login-page/login-page.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { CreateOrderComponent } from './create-order/create-order.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    OrderDetailComponent,
    DashboardComponent,
    OrdersListComponent,
    CreateOrderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSidenavModule
    
  ],
  exports:[
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
