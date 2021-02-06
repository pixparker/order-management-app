import axios from 'axios'
import { OrderRepository } from '../data/orderRepository'
import {Order, OrderStates} from '../types/order'
import config from '../config.json'
import { json } from 'body-parser';

export class OrderService {

    private orderRepository:OrderRepository;
    private authorization:string;

    constructor(props:any) {
        this.orderRepository = props.orderRepository;
        this.authorization = props.authorization;
        console.log('init : '+this.authorization);
    }


    public async getOrderById(id:string):Promise<Order>{
        return await this.orderRepository.getById(id);
    }


    public async createOrder(order:Order):Promise<Order>{
        order.payAmount=order.payAmount||0;
        order.discount = order.discount||0;
        order.totalQuantity = order.totalQuantity||0;
        order.state = OrderStates.Created;

        await this.orderRepository.addNew(order);        
        return order;
    }


    public async processPayment(order:Order):Promise<boolean>{//true=>confirmed, false=>declined
        const url = `${config.paymentsAppEndPoint}process`;

        let response:{code:number,message:string} = {} as any;
        await axios({
            baseURL:config.paymentsAppEndPoint,
            url:'/process',
            method:'post',
            data:{payAmount:order.payAmount,customerName:order.customerName},
            headers: {
                'authorization': this.authorization
            }            
        }).then(d=>{
            response = d.data;            
        });
        return response.code==1;
    }

}