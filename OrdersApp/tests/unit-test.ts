import 'mocha'
import sinon from 'sinon';
import { expect } from 'chai'
import {Order} from '../types/order'
import {OrderRepository} from '../data/orderRepository'
import { OrderService } from '../services/order-service';
import orderMock from './mock-data/orderMock.json';


describe('Order Service',async ()=>{
    const orderRepository = new OrderRepository();
    const orderService = new OrderService({
        orderRepository:orderRepository,
    })

    describe('create order', async ()=>{
        afterEach(function() {
            (orderRepository.addNew as any).restore();
            (orderService.processPayment as any).restore();
          });

          it('should insert new order',async()=>{
            sinon.stub(orderRepository, 'addNew').resolves(true);
            sinon.stub(orderService,'processPayment').resolves(false);

            const order = await orderService.createOrder(orderMock as any);
            expect(order).to.deep.equal(orderMock);
        }); 

    })
    


    describe('get order', async ()=>{
        afterEach(function() {
            (orderRepository.getById as any).restore();
            
          });

          it('should get order',async()=>{
            const orderId = orderMock.id;
            sinon.stub(orderRepository, 'getById')
            .withArgs(orderId)
            .resolves(orderMock as any);
            const order = await orderService.getOrderById(orderId);
            expect(order).to.deep.equal(orderMock);
        }); 
          
    })
        
});