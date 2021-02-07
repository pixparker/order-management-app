import express from 'express'
import bodyParser from 'body-parser'
import config from './config.json'
import paymentService from './services/payment-service'


const app = express();
var jsonParser = bodyParser.json()
const PORT = config.portNumber;
app.get('/', (req,res) => res.send( 'Payments App'));


//mock auth check (bearer token)
app.use((req,res,next)=>{
  const authorization = req.headers.authorization;
  if(!authorization){
    res.status(401).send('Payments App:Unauthorized');    
  }
  else{
    next();
  }
});

app.post('/process-payment',jsonParser, async (req,res)=>{
  
  const isConfirmed = await paymentService.processPayment();
  const responseCode = isConfirmed?1:2;
  const responseMessage = isConfirmed?'Payment is confirmed':'Payment is declined';


  res.send({
    code:responseCode,
    message:responseMessage, 
  })

});

app.listen(PORT, () => {
  console.log(`⚡️Payments Server is running at http://localhost:${PORT}`);
});