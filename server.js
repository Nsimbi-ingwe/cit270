const express = require('express');
const port = 3000;
const app = express();
const md5 = require('md5');
const bodyParser = require('body-parser');
const {createClient} = require('redis')

redisClient = createClient (
{
    socket:{
        port:6379, 
        host:"127.0.0.1"
    }
}
); // This should creat the connection to the redis client

redisClient.connect();

app.use(bodyParser.json());

app.listen(port, ()=> {
    console.log("listening on port: " + port)
})

const validatePassword = async (request, response) => {
    const requestHashedPassword = md5(request.body.password);
    const redisHashedPassword = await redisClient.hmGet('passwords', request.body.userName);
    const loginRequest = request.body;
    console.log("Request Body", JSON.stringify(request.body));

    if (requestHashedPassword==redisHashedPassword) {
        response.status(200);
        response.send("Welcome");
    } 
    else{
        response.status(401);
        response.send("Unauthorized");
    }
}

app.get('/', (request, response) =>{
    response.send("Hello");
})

app.post('/login', validatePassword);