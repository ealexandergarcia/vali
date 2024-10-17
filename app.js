const express = require("express");
const path = require('path');
const app = express();
const router = require("./server/router");

app.use(express.json());

app.use('/css', express.static(path.join(__dirname, process.env.EXPRESS_STATIC, 'css')));
app.use('/js', express.static(path.join(__dirname, process.env.EXPRESS_STATIC, 'js')));
app.use('/storage', express.static(path.join(__dirname, process.env.EXPRESS_STATIC, 'storage')));

app.use((req, res, next)=>{
  req.__dirname = __dirname;
  next();
}, router);

app.use((req, res)=>{
  res.status(404).json({message: "No tiene autorizacion"})
})
let config = {
  host: process.env.EXPRESS_HOST,
  port: process.env.EXPRESS_PORT 
};
app.listen(config, () => {
  console.log(`http://${config.host}:${config.port}`);
});