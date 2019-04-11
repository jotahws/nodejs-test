const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

const server = require('http').Server(app); //para requisições http
const io = require('socket.io')(server); //para requisições web socket

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
})

mongoose.connect('mongodb+srv://jotawind:Abacaxi123@cluster0-nq3w7.mongodb.net/omnistack?retryWrites=true', {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;
    return next;
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

server.listen('3333');