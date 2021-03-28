import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  title = 'Skinet';

  constructor(private basketService: BasketService, private accountService: AccountService){
    
  }

  ngOnInit(): void {
    this.loadbasket();
    this.loadCurrentUser();
  }

  loadCurrentUser(){
    const token = localStorage.getItem("token");
    
    this.accountService.loadCurrentUser(token).subscribe(()=>{
      console.log('load user');
    }, error =>{
      console.log(error);
    });
   
  }

  loadbasket(){
    const basket_id = localStorage.getItem('basket_id');
    if(basket_id){
      this.basketService.getBasket(basket_id).subscribe(()=>{
        console.log('Initialised basket');
      }, error=>{
        console.log(error);
      });
    }
  }

}
