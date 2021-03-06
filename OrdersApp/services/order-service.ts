import axios from 'axios'
import { OrderRepository } from '../data/orderRepository'
import {Order, OrderStates} from '../types/order'
import config from '../config.json'

const AUTO_DELIVERY_SECONDS = 10; //after 10 seconds, confirmed payment must move to delivered

export class OrderService {

    private orderRepository:OrderRepository;
    private authorization:string;
    private io:any;

    constructor(props:any) {
        this.orderRepository = props.orderRepository;
        this.authorization = props.authorization; 
        this.io = props.io;       
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
        this.handleOrderPayment(order);        
        return order;
    }


    public async processPayment(order:Order):Promise<boolean>{//true=>confirmed, false=>declined
        let response:{code:number,message:string} = {} as any;
        await axios({
            baseURL:config.paymentsAppEndPoint,
            url:'/process-payment',
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

    public async handleOrderPayment(order:Order){
        //process payment
        const paymentIsConfirmed = await this.processPayment(order);

        //change order state based on payment result
        order.state = paymentIsConfirmed ? OrderStates.Confirmed:OrderStates.Canceled;
        await this.orderRepository.updateOrderState(order.id,order.state);

        setTimeout(() => {
            this.emitOrderUpdate(order);
        }, 1000);


        //handle delivery
        this.handleOrderDelivery(order);
    }

    public async handleOrderDelivery(order:Order){
        if(order.state === OrderStates.Confirmed){
            setTimeout(async () => {
                
                order.state = OrderStates.Delivered;
                await this.orderRepository.updateOrderState(order.id,order.state);
                
                this.emitOrderUpdate(order);
                
            }, (AUTO_DELIVERY_SECONDS * 1000));
        }
    }

    public async getOrdersList():Promise<Order[]>{
        return await this.orderRepository.getAll();
    }

    public async cancelOrder(orderId:string):Promise<boolean>{
        return await this.orderRepository.updateOrderState(orderId,OrderStates.Canceled);
    }

    public emitOrderUpdate(order:Order){
        if(!this.io) return;
        this.io.emit('orderUpdate',order);
    }

}