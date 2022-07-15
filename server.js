const express = require('express');
const port = 443;
const https = require('https');
const fs = require('fs');
const app = express();
const md5 = require('md5');
const bodyParser = require('body-parser');
const {createClient} = require('redis')

redisClient = createClient (
{url: 'redis://default@parker-loadbalancer.cit270.com', }); // This should creat the connection to the redis client

app.use(bodyParser.json());

https.createServer({
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync('server.cert'),
    passphrase: 'P@ssw0rd'
}, app).listen(port, async () => {
    redisClient.connect();
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

const savePassword = async (request, response) => {
    const clearTextPassword = request.body.password;
    const hashedTextPassword = md5(clearTextPassword); // Self-docmenting code. the code walks you though what is going on.
    await redisClient.hSet('passwords', request.body.userName, hashedTextPassword);
    response.status(200); // status 200 means ok
    response.send({result:"Saved"});
}

app.get('/', (request, response) =>{
    response.send("Hello");
})

app.post('/signup', savePassword);
app.post('/login', validatePassword);