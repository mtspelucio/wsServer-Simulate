const WebSocket = require('ws');
const { WebSocketServer } = require('ws');

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');

const PORT = 3000;
const wsServer = new WebSocketServer({ port: PORT });


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

let wellData = {FR_L: 0, FR_R: 0, RE_L: 0, RE_R: 0}

app.use('/', (req, res) => {
    // res.render('index.html')
    res.send("wellData");
})

io.on('connection', socket => {
    socket.emit('receivedData', wellData)
})


wsServer.on('connection', socket => {
    console.log("---> Simulator connnected");

    socket.on('message', data => {
        wellData = JSON.parse(data)
        console.log("---> "  + data);
        socket.emit('sendData', wellData);
        io.emit('receivedData', wellData)
    });
});

server.listen(PORT+1)

console.log("Servidor rodando na porta: " + (PORT+1));