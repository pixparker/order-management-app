import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  orderForm = new FormGroup({
    customerName: new FormControl(''),
    note: new FormControl(''),
  });



  public async onSubmit(){
    console.log('data',this.orderForm.value);
    alert('submit');
  }


  public async onCancel(){
    
  }

}
