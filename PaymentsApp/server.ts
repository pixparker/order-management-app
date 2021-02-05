import express from 'express';
import config from './config.json';
import paymentService from './services/payment-service';


const app = express();
const PORT = config.portNumber;
app.get('/', (req,res) => res.send( 'Payments App'));


app.get('/payments/process',async (req,res)=>{

  let isConfirmed = false;
  let responseCode = 0;
  let responseMessage = '';

  
  isConfirmed = await paymentService.processPayment();

  responseCode = isConfirmed?1:2;
  responseMessage = isConfirmed?'Payment is confirmed':'Payment is declined';


  res.send({
    code:responseCode,
    message:responseMessage, 
  })

});

app.listen(PORT, () => {
  console.log(`⚡️Payments Server is running at https://localhost:${PORT}`);
});