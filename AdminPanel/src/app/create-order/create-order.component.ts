import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
    public dialogRef: MatDialogRef<CreateOrderComponent>,
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
    try{
      if(!this.form.valid) {
        this.snackBar.open("Invalid. Please check inputs");
        return;
      }

      const val = this.form.value;
      const order: Order = {
        id: '',
        customerName: val.customerName,
        sellerName: val.sellerName,
        note: val.note,
        totalQuantity: val.totalQuantity,
        discount: val.discount,
        promotion: val.promotion,
        payAmount: val.payAmount,
        createdOn: '',
        updatedOn: '',
        state: 0
      }
      this.isLoading = true;
      this.form.disable();
      const result = await this.orderService.createOrder(order);      
      this.dialogRef.close(result);
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
    this.dialogRef.close();
  }

}
