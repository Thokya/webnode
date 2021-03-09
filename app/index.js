// import {
//     createServer
// } from "http";
// import {
//     server as WebSocketServer
// } from 'websocket';

const http = require('http');
const WebSocketServer = require('websocket').server;

const httpserver = http.createServer();
const websocket = new WebSocketServer({
    "httpServer": httpserver
});

httpserver.listen(4000, () => console.log(`listening on localhost:4000`));

websocket.on("request", request => {
    const con = request.accept(null, request.origin)
    con.on("open", () => console.log("opened"))
    con.on("close", () => console.log("CLOSED!!!"))
    con.on("message", message => {
        //publish the message to redis
        console.log(`Received message ${message.utf8Data}`)
        con.send(`${message.utf8Data}`)
    });
    //setInterval(() => con.send("connection active"), 10000)
});