import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-check-delivery',
  templateUrl: './check-delivery.component.html',
  styleUrls: ['./check-delivery.component.scss']
})
export class CheckDeliveryComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  deliveryMethods: IDeliveryMethod[];

  constructor(private checkoutService: CheckoutService, private basketService : BasketService) { }

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethod().subscribe((dm: IDeliveryMethod[])=>{
      this.deliveryMethods = dm;
    }, error => {
      console.log(error);
    })
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod){
    this.basketService.setShippingPrice(deliveryMethod);
  }
}
