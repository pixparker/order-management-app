import { expect } from 'chai'
import { assert } from 'console';
import 'mocha'
import {MSSQL} from '../data/mssql'



describe('MSSQL Server', function() {

      it('should connect to ms-sql server properly', async ()=> {
          const pool = await MSSQL.getConnectionPool();
          expect(pool).not.null;
          pool.close();
      });

      it('should find order table in datbase',async ()=>{
        const pool = await MSSQL.getConnectionPool();
        const result = await pool.request() .query("select top 1 * from orders");

        expect(result).not.null;
        pool.close();
      })
  });