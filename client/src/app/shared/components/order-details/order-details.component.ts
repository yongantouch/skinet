import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasketTotals } from '../../models/basket';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  // basketTotal$: Observable<IBasketTotals>;
  @Input() shippingPrice: number;
  @Input() subTotal: number;
  @Input() total: number;

  constructor() { }

  ngOnInit(): void {
    // this.basketTotal$ = this.basketService.basketTotal$;
  }

}
