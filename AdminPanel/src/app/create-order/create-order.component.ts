import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from 'src/types/types';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  constructor(
    public orderService:OrderService,
    public snackBar: MatSnackBar,

  ) { }

  isLoading:boolean = false;
  form = new FormGroup({
    id: new FormControl(''),
    customerName: new FormControl(''),
    sellerName: new FormControl(''),
    note: new FormControl(''),
    totalQuantity:new FormControl(''),
    discount:new FormControl(''),
    promotion:new FormControl(''),
    payAmount:new FormControl(''),
  });

  ngOnInit(): void {
    

  }

      

  public async onSubmit(){
    this.snackBar.open("Submit")
    try{
      const val = this.form.value;
      // const order:Order = {
      //   id:'',
      //   customerName: val.customerName,
      //   sellerName: val.sellerName,
      //   note: val.note,
        
      // }
      // await this.orderService.createOrder(order);
    }
    catch(e){
      this.snackBar.open("Error!")
    } 
    finally{
      this.form.enable();
      this.isLoading = false;
    }   
  }


  public async onCancel(){
    
  }

}
