import { OrderRepository } from "../data/orderRepository";
import {Order, OrderStates} from '../types/order';

export class OrderService {

    private orderRepository:OrderRepository;

    constructor(props:any) {
        this.orderRepository = props.orderRepository;
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

}