import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Order } from 'src/types/types';
import { CreateOrderComponent } from '../create-order/create-order.component';
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
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public changeDetectorRef : ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadOrderList();
   this.subscription =  this.orderService.orderUpdate$.subscribe(this.handleUpdateOrder.bind(this));
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }


  async loadOrderList(){
    this.isLoading = true;
    this.orders = await this.orderService.getOrdersList();
    this.isLoading = false;

  }

  async onCreate(){
    const dialogRef = this.dialog.open(CreateOrderComponent, {
      width: '800px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.id){
        this.snackBar.open("Order created successfully",'',{
          duration: 1000,
        });
      }
      
    });
  }

  async onDetail(order:Order){
    this.router.navigate(['order-detail/'+order.id]);
  }

  async onCancelOrder(order:Order){
    
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
    

  async handleUpdateOrder(order: Order) {
    if (!order) return;
    let found = false;
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i].id == order.id) {
        this.orders[i] = order;
        found = true;
      }
    }
    if (!found) this.orders.unshift(order);
    const newList: Order[] = [];
    this.orders.forEach(p => newList.push(p));
    this.orders = newList;
    this.changeDetectorRef.detectChanges();
  }
}
