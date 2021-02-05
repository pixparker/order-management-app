import express from 'express'
import config from './config.json'
import {OrdersController} from './controllers/orders-controller'
import {MSSQL} from './data/mssql'


const app = express();
const PORT = config.portNumber;
const controller = OrdersController;
const sql = MSSQL;


app.get('/', (req,res) => res.send( 'Orders Management App'));


app.get('/test',async (req,res)=>{

  try{
    
    let pool = await sql.getConnection();
    
    const result = await pool.request() .query("select top 10 * from users");

    

  
    res.send(JSON.stringify(result));
  }
  catch(e){
    res.status(500).write(e.message);
    res.send();
  }
  

});


app.listen(PORT, () => {
  console.log(`⚡️Orders Management Server is running at https://localhost:${PORT}`);
});