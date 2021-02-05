import express from 'express';
import config from './config.json';


const app = express();
const PORT = config.portNumber;
app.get('/', (req,res) => res.send( ' Hi Express + TypeScript Server'));
app.listen(PORT, () => {
  console.log(`⚡️[server]:--- Server is running at https://localhost:${PORT}`);
});