import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  @Input() appStepper: CdkStepper;
  basket$: Observable<IBasket>;

  constructor(private baskerService: BasketService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.basket$ = this.baskerService.basket$;
  }

  createPaymentIntent(){
    return this.baskerService.createPaymentIntent().subscribe((response: any) =>{
      // this.toastr.success('Payment intent created');
      this.appStepper.next();
    }, error =>{
      console.log(error.message);
    });
  }

}
