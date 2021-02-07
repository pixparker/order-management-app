import { expect } from 'chai'
import axios from 'axios'
import 'mocha'
import config from '../config.json'
import {OrderRepository} from '../data/orderRepository'
import { OrderService } from '../services/order-service';


describe('PaymentApp Availibility', function() {

      it('should able to connect to payment app endpoint', async ()=> {
          
        let status = 0;
        await axios({
            baseURL:config.paymentsAppEndPoint,
            url:'/',
            method:'get',
            headers: {
                'authorization': 'test auth'
            }            
        }).then(d=>{
           status = d.status;   
        });
        expect(status).to.equal(200);
      });
      
  });