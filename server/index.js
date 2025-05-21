const express = require('express');
const http = require('http');
const websocket = require('ws');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '..', 'app')));

//app.get('/', (req,res) => res.sendFile(path.join(__dirname, 'index.html')));

const httpServer = http.createServer(app);
const wss = new websocket.Server({ server: httpServer })

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log(message.toString())
        ws.send(message.toString())
    })
})

httpServer.listen(port, () => console.log(`http and ws server listening on port ${port}`));
