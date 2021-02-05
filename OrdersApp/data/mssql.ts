import sql, { ConnectionPool } from 'mssql'
import config from '../config.json'

export namespace MSSQL {
    export async function getConnection():Promise<sql.ConnectionPool>{
        const connect = await new ConnectionPool(config.sql).connect();
        return connect;
    }
}
