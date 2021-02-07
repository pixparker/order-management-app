import express from 'express'
import bodyParser, { json } from 'body-parser'
import config from './config.json'
import {MSSQL} from './data/mssql'
import { OrderRepository } from './data/orderRepository'
import {createContainer, asClass, asValue, asFunction } from 'awilix'
import { Order } from './types/order'
import { OrderService } from './services/order-service'


const app = express();
var jsonParser = bodyParser.json()
const container = createContainer();
const PORT = config.portNumber;


//register global container
container.register({

});



//register scoped container
app.use((req, res, next) => {
  const scopedContainer = container.createScope();
  scopedContainer.register({
    orderRepository:asClass(OrderRepository).scoped(),
    orderService:asClass(OrderService).scoped(),
    authorization:asFunction(()=>req.headers.authorization),
  });
  (req as any).scope = scopedContainer;
  next();
});

const resolve = (name:string,req:any)=>{
  return req.scope.resolve(name);
}


//mock auth check (bearer token)
app.use((req,res,next)=>{
  const authorization = req.headers.authorization;
  
  if(!authorization){
    res.status(401).send('Orders App: Unauthorized');    
  }
  else{
    next();
  }
});


//inform app name
app.get('/', (req,res) => res.send( 'Orders App'));

//get orders list
app.get('/orders/all', async (req,res)=>{
  try{
    const orderService:OrderService = resolve('orderService',req);
    const orders = await orderService.getOrdersList();
    res.send(orders);
  }
  catch(e){
    res.status(500).send(e.message);
  }
})

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


app.post('/orders/cancel/:id', async (req,res)=>{
  try{    
    const id = req.params.id;
    const orderService:OrderService = resolve('orderService',req);    
    const result =  await orderService.cancelOrder(id);
    if(result){
      res.send({message:'OK'});
    }
    else{
      res.status(500).send({message:'Error'})
    }
  }
  catch(e){
    res.status(500).send(e.message);
  }
})





app.get('/test',async (req,res)=>{
  try{

    const orderRepository:OrderRepository = resolve('orderRepository',req);
    const result = await orderRepository.updateOrderState('2B8C8D80-06F7-AC07-2A49-16272110F166',20);
    res.send(result);
  }
  catch(e){
    res.status(500).send(e.message);
  }
   

});


app.listen(PORT, () => {
  console.log(`Orders Server is running at http://localhost:${PORT}`);
});