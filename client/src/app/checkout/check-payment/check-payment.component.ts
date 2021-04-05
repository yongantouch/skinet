import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { IOrder } from 'src/app/shared/models/order';
import { CheckoutService } from '../checkout.service';

declare var Stripe;

@Component({
  selector: 'app-check-payment',
  templateUrl: './check-payment.component.html',
  styleUrls: ['./check-payment.component.scss']
})
export class CheckPaymentComponent implements AfterViewInit, OnDestroy {
  @Input() checkoutForm: FormGroup;
  @ViewChild('cardNumber', {static: true}) cardNumberElement: ElementRef;  
  @ViewChild('cardExpiry', {static: true}) cardExpiryElement: ElementRef;  
  @ViewChild('cardCvc', {static: true}) cardCvcElement: ElementRef;  
  stripe: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardError: any;
  cardHandler = this.onChange.bind(this);
  loading = false;
  cardNumberValid = false;
  cardExpiryValid = false;
  cardCvcValid = false;

  constructor(private basketService: BasketService, private checkoutService: CheckoutService,
    private toastr: ToastrService, private router: Router) { }

  ngAfterViewInit(): void {
                       //'pk_test_51IcERVA4eBZjTgTRKxXOseKzTI7lqar0Ts0Ju5Th2wP5D6nSXKwXkA5AIjqVmzpX0KyTUG6PwoZIMIkt1gVtYUZn00OrljKxgM'
    this.stripe = Stripe('pk_test_51IcERVA4eBZjTgTRKxXOseKzTI7lqar0Ts0Ju5Th2wP5D6nSXKwXkA5AIjqVmzpX0KyTUG6PwoZIMIkt1gVtYUZn00OrljKxgM');
    const elements = this.stripe.elements();

    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);
    this.cardNumber.addEventListener('change', this.cardHandler);

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
    this.cardExpiry.addEventListener('change', this.cardHandler);

    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
    this.cardCvc.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy(){
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  }

  onChange(event){
    console.log(event);
    if(event.error){
      this.cardError = event.error.message;
    }else{
      this.cardError = null;
    }
    switch(event.elementType){
      case 'cardNumber':
        this.cardNumberValid = event.complete;
        break;
      case 'cardExpiry':
        this.cardExpiryValid = event.complete;
        break;
      case 'cardCvc':
        this.cardCvcValid = event.complete;
        break;
    }
  }

  async submitOrder(){
    this.loading = true;
    const basket = this.basketService.getCurrentBasketValue();
    
    
    try{
      const createOrder = await this.createOrder(basket);
      const paymentResult = await this.confirmPaymentWithStripe(basket);
      if(paymentResult.paymentIntent){
        // this.basketService.deleteLocalBasket(basket.id);
        this.basketService.deleteBasket(basket);
        const navigationExtras : NavigationExtras = {state: createOrder};
        this.router.navigate(['checkout/success'],navigationExtras);
      }else{
        this.toastr.error(paymentResult.error.message);
      }
    }catch(error){
      console.log(error);
      this.loading =false;
    }
    this.loading = false;
  }

  private confirmPaymentWithStripe(basket) {
    return this.stripe.confirmCardPayment(basket.clientSecret, {
      payment_method:{
        card: this.cardNumber,
        billing_details:{
          name: this.checkoutForm.get('paymentForm').get('nameOnCard').value
        }
      }
    });
  }

  private createOrder(basket: IBasket) {
    const orderToCreate = this.getOrderToCreate(basket);
    return this.checkoutService.createOrder(orderToCreate).toPromise();
  }

  private getOrderToCreate(basket: IBasket) {
    return {
      basketId: basket.id,
      deliveryMethodId: +this.checkoutForm.get('deliveryForm').get('deliveryMethod').value,
      shipToAddress: this.checkoutForm.get('addressForm').value
    };
  }

}
