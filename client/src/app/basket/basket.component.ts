import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;
  basketTotal$: Observable<IBasketTotals>;

  constructor(private baskerService: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.baskerService.basket$;
    this.basketTotal$ = this.baskerService.basketTotal$;
  }

  removeBasketItem(item: IBasketItem){
    this.baskerService.removeItemFromBasket(item);
  }

  incrementItemQuantity(item: IBasketItem){
    this.baskerService.incrementItemQuantity(item);
  }

  decrementItemQuantity(item: IBasketItem){
    this.baskerService.decrementItemQuantity(item);
  }

}
