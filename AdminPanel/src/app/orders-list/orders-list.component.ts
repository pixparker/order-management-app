import { Component, OnInit } from '@angular/core';
import { Order } from 'src/types/types';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  orders:Order[]=[];
  displayColumns: string[] =[
    'createdOn',
    'customerName',    
    'updatedOn',
    'totalQuantity',
    'payAmount',
    'state',
    'actions'


];
//    ['customerName', 'createdOn', 'updatedOn', 
//   'totalQuantity',
//   'sellerName',
//   'payAmount',
//   'note',
//   'state',
//   'actions'

// ];

  constructor(
    public orderService:OrderService
  ) { }

  ngOnInit(): void {
    this.loadOrderList();

  }


  async loadOrderList(){
    this.orders = await this.orderService.getOrdersList();

  }


  async onDetail(order:Order){

  }


  async onCancel(order:Order){
    

    
  }
    





}
