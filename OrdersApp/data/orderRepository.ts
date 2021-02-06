import sql from 'mssql'
import { Guid } from "guid-typescript";
import {Order} from '../types/order'
import { MSSQL } from './mssql';


export class OrderRepository{

    constructor() {
        console.log('rep constructing');
        
    }

    private async openConnection():Promise<sql.ConnectionPool>{
        return await MSSQL.getConnectionPool();
    }
    
    

    public async addNew(order:Order):Promise<boolean>{
        await this.openConnection();

        const orderId = order.id || Guid.create();
        const createdOn = new Date();
        createdOn.setMilliseconds(0);
        

        const connection = await this.openConnection();
        const request = connection.request();        request.input('id',sql.UniqueIdentifier,orderId);
        request.input('customerName',sql.NVarChar,order.customerName);
        request.input('createdOn',sql.DateTime,createdOn);
        request.input('updatedOn',sql.DateTime,createdOn);        
        request.input('totalQuantity',sql.Int,order.totalQuantity||0);
        request.input('note',sql.NVarChar,order.note);
        request.input('payAmount',sql.Float,order.payAmount);
        request.input('sellerName',sql.NVarChar,order.sellerName);        
        request.input('state',sql.SmallInt,order.state);        
        request.input('discount',sql.Float,order.discount);        
        request.input('promotion',sql.NVarChar,order.promotion);        
        const command= `
        insert into Orders (
            id,
            customerName,
            createdOn,
            updatedOn,
            totalQuantity,
            note,
            payAmount,
            sellerName,
            state,
            discount,
            promotion            
            ) values (
                @id,
                @customerName,
                @createdOn,
                @updatedOn,
                @totalQuantity,
                @note,
                @payAmount,
                @sellerName,
                @state,
                @discount,
                @promotion
            )
        `;

        const result = await request.query(command);
        if(result.rowsAffected.length!=1) return false;        
        order.id = orderId.toString().toUpperCase();
        order.createdOn = createdOn;
        order.updatedOn = createdOn;
        connection.close();
        return true;
    }


    public async getById(id:string|null):Promise<Order>{
        if(!id) return null as any;
        const connection = await this.openConnection();        
        const result = await  connection.query(`select
            id,
            customerName,
            createdOn,
            updatedOn,
            totalQuantity,
            note,
            payAmount,
            sellerName,
            state,
            discount,
            promotion
        from Orders where id= '${id}'`);
        const order : Order =  result.recordset[0] as any;        
        order.id = order.id.toUpperCase();
        connection.close();
        return order;
    }
}