import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket, IBasketItem } from 'src/app/shared/models/basket';
import { IOrderItem } from 'src/app/shared/models/order';

@Component({
  selector: 'app-check-review',
  templateUrl: './check-review.component.html',
  styleUrls: ['./check-review.component.scss']
})
export class CheckReviewComponent implements OnInit {
  basket$: Observable<IBasket>;

  constructor(private baskerService: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.baskerService.basket$;
  }

}
