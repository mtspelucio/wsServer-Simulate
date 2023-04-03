const WebSocket = require('ws');
const { WebSocketServer } = require('ws');

const PORT = 3000;
const wsServer = new WebSocketServer({ port: PORT });

let wellData // { FR_L, FR_R, RE_L, RE_R }

wsServer.on('connection', socket => {
    console.log("---> Simulator connnected");

    socket.on('message', data => {
        wellData = JSON.parse(data)
        console.log("---> "  + wellData);
    });
});

console.log(" Server is listening on port " + PORT);