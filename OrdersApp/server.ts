import express from 'express'
import config from './config.json'
import {MSSQL} from './data/mssql'
import { OrderRepository } from './data/orderRepository';
import { Order } from './types/order';


const app = express();
const PORT = config.portNumber;
const sql = MSSQL;


app.get('/', (req,res) => res.send( 'Orders Management App'));


app.get('/test',async (req,res)=>{

  try{
    
    const repo = new OrderRepository();
    let order = <Order>{
      customerName:'cname',
      sellerName:'seller name',
      totalQuantity:20,
      payAmount:10.23,
    };
    
    const result= await repo.getById('49CBADCE-90F8-8E00-54B9-7FA742BBFB59');
  
    res.send(JSON.stringify(result));
  }
  catch(e){
    res.status(500).write(e.message);
    res.send();
  }
  

});


app.listen(PORT, () => {
  console.log(`⚡️Orders Management Server is running at https://localhost:${PORT}`);
});