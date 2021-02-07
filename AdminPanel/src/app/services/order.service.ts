import { Injectable } from '@angular/core';
import { Order, OrderStates } from 'src/types/types';
import { Observer, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    public httpClient:HttpClient
  ) { }

  

  public async getOrdersList():Promise<Order[]>{
    const result = await this.httpClient.get('/orders/all').toPromise();    
    return result as any;
  }


  public async getOrderById(id:string):Promise<Order>{
    const result = await this.httpClient.get('/orders/'+id).toPromise();
    return result as any;
  }


  public async cancelOrder(order:Order):Promise<boolean>{
    await this.httpClient.post('/orders/cancel/'+order.id,{}).toPromise();    
    order.state = OrderStates.Canceled;
    this.orderUpdate.next(order);
    return true;
  }





   public orderUpdate = new Subject<Order>();
   public orderUpdate$ = this.orderUpdate.asObservable() //Has a $ 


}
