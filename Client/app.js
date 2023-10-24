const express = require('express');
const session = require('express-session')
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);
const PORT = 4000;

app.use(session({
    secret: 'eyee',
    resave: true,
    saveUninitialized: true
  }));

app.use(express.static('./src/public'));
app.use('/js', express.static('./src/public/js'))
app.use('/css', express.static('./src/public/css'))

app.set('views' , './src/views')
app.set('view engine' , 'ejs')


//controllers 
const loadPage = require('./controllers/loadPage');
const axiosRequest = require('./controllers/axiosRequest');
const { CLIENT_LONG_PASSWORD } = require('mysql/lib/protocol/constants/client');

loadPage(app)
axiosRequest(app)


server.listen(PORT , () => {
    console.log('Listening to port' ,PORT)
})
let userId;
let userOnline = 0;
let user = {};
io.on('connection' , (socket) => {
    userOnline++
    socket.on('name' , ( data ) => {
        user[socket.id] = data; 
        console.log(userOnline)
        io.emit('online', userOnline)  
    })

    socket.on('disconnect' , (data) => {
        userOnline--
        delete user[socket.id];
        io.emit('online', userOnline) 
    })
    socket.on('messege' , (data) => {
        const userName = user[socket.id]
        if(userName){
            io.emit('chat' , {userid: userName , messege: data.messege})
        }
    })
})
