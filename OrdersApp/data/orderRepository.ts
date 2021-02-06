import sql from 'mssql'
import { Guid } from "guid-typescript";
import {Order} from '../types/order'
import { MSSQL } from './mssql';
import { create } from 'domain';

export class OrderRepository{

    private connection : sql.ConnectionPool;

    private async openConnection(){
        if(this.connection) return;
        this.connection = await MSSQL.getConnectionPool();
    }
    
    public async closeConnection(){
        if(!this.connection) return;
        await this.connection.close();
        this.connection = null as any;      
    }

    public async addNew(order:Order):Promise<boolean>{
        await this.openConnection();

        const orderId = order.id || Guid.create();
        const createdOn = new Date();
        createdOn.setMilliseconds(0);
        

        const request = this.connection.request();
        request.input('id',sql.UniqueIdentifier,orderId);
        request.input('customerName',sql.NVarChar,order.customerName);
        request.input('createdOn',sql.DateTime,createdOn);
        request.input('updatedOn',sql.DateTime,createdOn);
        request.input('userPinCode',sql.NVarChar,order.userPinCode);
        request.input('totalQuantity',sql.Int,order.totalQuantity||0);
        request.input('note',sql.NVarChar,order.note);
        request.input('payAmount',sql.Float,order.payAmount);
        request.input('sellerName',sql.NVarChar,order.sellerName);        
        const command= `
        insert into Orders (
            id,
            customerName,
            createdOn,
            updatedOn,
            userPinCode,
            totalQuantity,
            note,
            payAmount,
            sellerName
            ) values (
                @id,
                @customerName,
                @createdOn,
                @updatedOn,
                @userPinCode,
                @totalQuantity,
                @note,
                @payAmount,
                @sellerName
            )
        `;

        const result = await request.query(command);
        if(result.rowsAffected.length!=1) return false;        
        order.id = orderId.toString().toUpperCase();
        order.createdOn = createdOn;
        order.updatedOn = createdOn;
        return true;
    }


    public async getById(id:string|null):Promise<Order>{
        if(!id) return null as any;

        await this.openConnection();
        const request = this.connection.request();        
        const result = await  this.connection.query(`select
            id,
            customerName,
            createdOn,
            updatedOn,
            userPinCode,
            totalQuantity,
            note,
            payAmount,
            sellerName
        from Orders where id= '${id}'`);
        const order : Order =  result.recordset[0] as any;
        //order.createdOn = new Date(order.createdOn);
        //order.updatedOn = new Date(order.UpdatedOn);
        order.id = order.id.toUpperCase();
        return order;
    }
}