const express = require('express'); // imported the library
const app = express(); // used the library
const bodyParser = require('body-parser');
const port = 3000;
const md5 = require('md5');
const {createClient} = require('redis');
const redisClient = createClient();


app.use(bodyParser.json()); // Use the middleware

app.listen(port, ()=>{
    console.log("listening on Port: " +port)}); // listen

const validatePassword = async(request, response) => {
    await redisClient.connect();
    const requestHashedPassword = md5(request.body.password)
    const redisHashedPassword = await redisClient.hGet("passwords", request.body.userName);
    const loginRequest = request.body;
    console.log("request Body", JSON.stringify(request.body));
    // search database for username and retrieve current password

    // compare the hashed version of the password that was sent with the hashed version from the database
    if (loginRequest.userName=="fake@fake.com" && requestHashedPassword == redisHashedPassword){
        response.status(200); // 200 means ok
        response.send("Welcome");
    } else {
        response.status(401); // 401 means unauthorized
        response.send("Unauthorized");
    }
}

// app.post('/login',async (request, response)=> {

//     }
// );

app.get('/', (request,response)=>{
    response.send("Hello")}); // response