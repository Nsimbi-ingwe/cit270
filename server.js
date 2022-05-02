const express = require('express'); // imported the library

const app = express(); // used the library

app.listen(3000, ()=>{console.log("listening...")}); // listen

app.get('/', (req,res)=>{res.send("Hello")}); // response