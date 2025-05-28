import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {Server} from 'socket.io';


const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(express.static(path.join(__dirname, 'public')));
const expressServer = app.listen(port, () => console.log(`http and ws server listening on port ${port}`));


//app.get('/', (req,res) => res.sendFile(path.join(__dirname, 'index.html')));

const wss = new Server(expressServer , {
    cors: {
        origin: process.env.NODE_ENV === 'production' ? '*' : '*'
    }
});

wss.on('connection', ws => {
    console.log(`User ${ws.id} connected`)
    ws.on('message', data => {
        console.log(data)
        ws.emit('message', `${ws.id}: ${data}`)
    })
})

