import { Injectable } from '@angular/core';
import { Order } from 'src/types/types';
import { Observable, throwError } from 'rxjs';
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

    console.log(result);
    return result as any;


  }




}
