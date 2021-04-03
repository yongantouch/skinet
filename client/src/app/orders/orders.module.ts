import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersDetailedComponent } from './orders-detailed/orders-detailed.component';
import { SharedModule } from '../shared/shared.module';
import { OrdersComponent } from './orders.component';
import { RouterModule } from '@angular/router';
import { OrdersRoutingModule } from './orders-routing.module';



@NgModule({
  declarations: [OrdersComponent,OrdersDetailedComponent],
  imports: [
    CommonModule,
    SharedModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
