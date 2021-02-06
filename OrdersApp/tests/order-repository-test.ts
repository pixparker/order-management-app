import { expect } from 'chai'
import 'mocha'
import {Order} from '../types/order'
import {OrderRepository} from '../data/orderRepository'


describe('Order Repository',async ()=>{
    const orderRepository =  new OrderRepository();
    let orderToInsert = <Order>{
        customerName:'test:customer name '+Math.floor(Math.random()*200),
        note:'test: note'+Math.floor(Math.random()*100),
        sellerName:'test: seller name',
        totalQuantity: Math.floor(Math.random()*1000),
        payAmount:+(Math.random()*1000).toFixed(2),
        state: Math.floor(Math.random()*4),
        discount: 0,
        promotion:'test: promotion name'
    };
    
        it('should insert new order to database without error',async()=>{
            let result = await orderRepository.addNew(orderToInsert);      
            expect(result).to.true;
            
        });

        it('shoul inserted order value and persisted value equal',async ()=>{
                    const order = await orderRepository.getById(orderToInsert.id);
                    expect(orderToInsert).to.deep.equal(order);
      });
    
    
});

