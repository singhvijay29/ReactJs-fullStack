const express = require('express')
const app = express();
const connect = require("./db");
app.use(express.json());

const vehicalCont = require("./controllers/vehical.controller");

app.use("/api/vehical", vehicalCont);



app.listen(1999, async()=>{
    await connect();
    console.log('listening on port 1999')
})

module.exports = app;