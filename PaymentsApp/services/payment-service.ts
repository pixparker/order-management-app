import { Module } from "module";


class PaymentService{
   public static processPayment = async () =>{
      //mocking payment logic
      return Math.random()>.5;
   }
}


export default PaymentService;