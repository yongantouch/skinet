import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';

@Component({
  selector: 'app-check-sucess',
  templateUrl: './check-sucess.component.html',
  styleUrls: ['./check-sucess.component.scss']
})
export class CheckSucessComponent implements OnInit {
  order: IOrder;

  constructor(private router: Router) { 
    const navigation = this.router.getCurrentNavigation();
    const state = navigation && navigation.extras && navigation.extras.state;
    if(state){
      this.order = state as IOrder;
    }
  }

  ngOnInit(): void {
  }

}
