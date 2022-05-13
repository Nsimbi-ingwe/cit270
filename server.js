const express = require('express'); // imported the library
const app = express(); // used the library
const bodyParser = require('body-parser');
const port = 3000;
const md5 = require('md5');

app.use(bodyParser.json()); // Use the middleware

app.listen(port, ()=>{
    console.log("listening on Port: " +port)}); // listen

app.post('/login', (request, response)=> {
    const loginRequest = request.body;
    console.log("request Body", JSON.stringify(request.body));
    // search database for username and retrieve current password
    
    // compare the hashed version of the password that was sent with the hashed version from the database
    if (loginRequest.userName=="fake@fake.com" && loginRequest.password=="FakePassword1!"){
        response.status(200); // 200 means ok
        response.send("Welcome");
    } else {
        response.status(401); // 401 means unauthorized
        response.send("Unauthorized");
    }
});
app.get('/', (request,response)=>{
    response.send("Hello")}); // response