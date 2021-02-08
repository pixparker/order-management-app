import { Injectable } from '@angular/core';
import { Order, OrderStates } from 'src/types/types';
import { Observer, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from './websocket.service';




@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    public httpClient:HttpClient,
    public webSocketService:WebsocketService,    
  ) {

    webSocketService.registerListener('orderUpdate',(data:any)=>{
      console.log('order update from server',data);
      if(!data || !data.id) return;      
      this.orderUpdate.next(data);
    })
  }

  public lastCreatedOrder:Order;
  public orderUpdate = new Subject<Order>();
  public orderUpdate$ = this.orderUpdate.asObservable();
  
  

  public async getOrdersList():Promise<Order[]>{
    const result = await this.httpClient.get('/orders/all').toPromise();    
    return result as any;
  }


  public async getOrderById(id:string):Promise<Order>{
    const result = await this.httpClient.get('/orders/'+id).toPromise();
    return result as any;
  }

  public async createOrder(order:Order):Promise<Order>{
    const result = await this.httpClient.post<Order>('/orders/create',order).toPromise();
    this.lastCreatedOrder = result;
    this.orderUpdate.next(result);
    return result;
  }

  public async cancelOrder(order:Order):Promise<boolean>{
    const result =  await this.httpClient.post<Order>('/orders/cancel/'+order.id,{}).toPromise();
    if(!result) return false;    
    const newOrder = JSON.parse(JSON.stringify(order));
    newOrder.state = OrderStates.Canceled;
    this.orderUpdate.next(newOrder);
    return true;
  }






}
