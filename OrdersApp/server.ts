import express from 'express'
import bodyParser, { json } from 'body-parser'
import config from './config.json'
import {MSSQL} from './data/mssql'
import { OrderRepository } from './data/orderRepository'
import {createContainer, asClass, asValue } from 'awilix'
import { Order } from './types/order'
import { OrderService } from './services/order-service'


const app = express();
var jsonParser = bodyParser.json()
const container = createContainer();
const PORT = config.portNumber;
const sql = MSSQL;

//register global container
container.register({

});



//register scoped container
app.use((req, res, next) => {
  const scopedContainer = container.createScope();
  scopedContainer.register({
    orderRepository:asClass(OrderRepository),
    orderService:asClass(OrderService)
  });
  (req as any).scope = scopedContainer;
  next();
});

const resolve = (name:string,req:any)=>{
  return req.scope.resolve(name);
}





app.get('/', (req,res) => res.send( 'Orders Management App'));

//get order by id
app.get('/orders/:id',async (req,res)=>{
  try{
    const id = req.params.id;
    const orderService:OrderService = resolve('orderService',req);
    const order = await orderService.getOrderById(id);
    res.send(order);
  }
  catch(e){
    res.status(500).send(e.message);
  }
})

//create order
app.post('/orders/create',jsonParser, async (req,res)=>{
  try{    
    const orderService:OrderService = resolve('orderService',req);
    const orderToInsert:Order= req.body;
    const order =  await orderService.createOrder(orderToInsert);
    res.send(order);
  }
  catch(e){
    res.status(500).send(e.message);
  }
})

app.get('/test',async (req,res)=>{
  try{

    const repo = new OrderRepository();
    let order = <Order>{
      customerName:'cname',
      sellerName:'seller name',
      totalQuantity:20,
      payAmount:10.23,
    };
    
    const result= await repo.getById('84488A0F-9A86-88CF-53A5-990401C2EF39');
  
    res.send(result);
  }
  catch(e){
    res.status(500).send(e.message);
  }
   
  
  

});


app.listen(PORT, () => {
  console.log(`⚡️Orders Management Server is running at https://localhost:${PORT}`);
});