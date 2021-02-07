import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/types/types';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public orderService:OrderService
  ) { }

  private orderId:string;
  public isLoading:boolean;
  public order:Order = {} as any;

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if(orderId) this.loadOrder(orderId);
  }

  private async loadOrder(id:string){
    this.isLoading = true;
    this.order = await this.orderService.getOrderById(id);
    this.isLoading = false;


  }

  onBack(){
    this.router.navigate(['/orders-list']);
  }

}
