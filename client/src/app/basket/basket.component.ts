import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;

  constructor(private baskerService: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.baskerService.basket$;
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
