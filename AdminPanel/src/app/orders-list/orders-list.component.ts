import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Order } from 'src/types/types';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit,OnDestroy  {

  orders: Order[] = [];
  displayColumns: string[] = [
    'createdOn',
    'customerName',
    'updatedOn',
    'totalQuantity',
    'payAmount',
    'state',
    'actions'
  ];

  private subscription : any;
  public isLoading:boolean;

  constructor(
    public router: Router,
    public orderService:OrderService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadOrderList();
   this.subscription =  this.orderService.orderUpdate$.subscribe(d=>{
      console.log("observer:",d);
    });
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }


  async loadOrderList(){
    this.isLoading = true;
    this.orders = await this.orderService.getOrdersList();
    this.isLoading = false;

  }


  async onDetail(order:Order){
    this.router.navigate(['order-detail/'+order.id]);

  }


  async onCancel(order:Order){
    
    try{
      await this.orderService.cancelOrder(order);
      this.snackBar.open('Order canceled','', {
        duration: 2000,
      });
    }
    catch(e){
      this.snackBar.open('Error!','', {
        duration: 2000,
      });

    }
    
    
    
  }
    





}
