const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);
const PORT = 4000;


app.use(express.static('./src/public'));
app.use('/js', express.static('./src/public/js'))
app.use('/css', express.static('./src/public/css'))

app.set('views' , './src/views')
app.set('view engine' , 'ejs')


//controllers 
const loadPage = require('./controllers/loadPage');

loadPage(app)


server.listen(PORT , () => {
    console.log('Listening to port' ,PORT)
})
let userId;
let userOnline = 0;
io.on('connection' , (socket) => {
    userOnline++;
    console.log('A user connected', socket.id)
    userId = socket.id
    io.emit('online', userOnline)
    socket.on('disconnect' , (data) => {
        userOnline--
    })
    socket.on('messege' , (data) => {
        io.emit('chat' , {userid: userId , messege: data.messege})
    })

})
