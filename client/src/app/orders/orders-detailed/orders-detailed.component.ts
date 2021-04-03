import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-orders-detailed',
  templateUrl: './orders-detailed.component.html',
  styleUrls: ['./orders-detailed.component.scss']
})
export class OrdersDetailedComponent implements OnInit {
  order: IOrder;

  constructor(private route: ActivatedRoute, private bcService: BreadcrumbService,
    private oderService: OrdersService) { 
      this.bcService.set("@OrderDetailed", ' ');
    }

  ngOnInit(): void {
    this.oderService.getOrderDetailed(+this.route.snapshot.paramMap.get('id'))
    .subscribe((order: IOrder) =>{
      this.order = order;
      this.bcService.set("@OrderDetailed", `Order# ${order.id} - ${order.status}`);
    }, error => {
      console.log(error);
    });
  }

}
