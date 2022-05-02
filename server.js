const express = require('express'); // imported the library

const app = express(); // used the library

const port = 3000;

app.listen(port, ()=>{console.log("listening on Port: " +port)}); // listen

app.get('/', (req,res)=>{res.send("Hello")}); // response