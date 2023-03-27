import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { AllordersComponent } from './allorders/allorders.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrderComponent,
    AllordersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
