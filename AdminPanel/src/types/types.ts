export class Order{
    id:string;
    customerName:string;
    createdOn:string;
    updatedOn:string;
    totalQuantity:number;
    note:string;
    payAmount:number;
    sellerName:string;
    state:number;
    discount:number;
    promotion:string;
}


export const OrderStates = {
    Created:0,
    Confirmed:1,
    Canceled:2,
    Delivered:3,
}