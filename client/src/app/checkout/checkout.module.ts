import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CheckAddressComponent } from './check-address/check-address.component';
import { CheckDeliveryComponent } from './check-delivery/check-delivery.component';
import { CheckPaymentComponent } from './check-payment/check-payment.component';
import { CheckReviewComponent } from './check-review/check-review.component';
import { CheckSucessComponent } from './check-sucess/check-sucess.component';



@NgModule({
  declarations: [CheckoutComponent, CheckAddressComponent, CheckDeliveryComponent, CheckPaymentComponent, CheckReviewComponent, CheckSucessComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule,
  ]
})
export class CheckoutModule { }
