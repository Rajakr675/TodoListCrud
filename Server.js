const express = require("express");
const app = express();
const port = 3000;
const router = require('./Routers')
const path = require("path");

app.use(express.json());

app.use("/static", express.static(path.join(__dirname, "/Images")));

app.use('/',router)

app.listen(port,()=>{
  console.log(`My Server Running At http://localhost:${port}`);
});