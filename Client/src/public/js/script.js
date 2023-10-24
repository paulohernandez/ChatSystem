class Home {
    constructor(){
        this.socket = io.connect('/')
        this.name;
        this.conversation();
    }
    
    async login(){
        let name = $('#username').val()
        window.location.href = `/login/${name}`
    }
    async mySession(){
        await axiosRequest( 'GET' , '/mysession' , {} ).done(( response ) => {
            let userName = response.data._name
            this.socket.emit('name' , userName)
        })
    }

    sendMessage(){
        let messege = $('#input-messege').val()
        this.socket.emit('messege' ,{ messege:  messege})
        $('#input-messege').val('Sent!')
    }
    async conversation(){
        await this.mySession()
        this.socket.on('online', (data) => {
            $('.member-online').text(`${data} ONLINE`)
        })
        this.socket.on('chat' , (data) => {
        let details = `${data.userid}: ${data.messege}`
        let userMessege = $('<h3>').text(details)
        $('#chat-messages').append(userMessege)
        })
    }



}

$(document).ready(function(){
    let home = new Home();
        $('.submit').on('click', function(){
            home.login();
        })

        $('#btn-send').on('click', function(){
            home.sendMessage();
        })
})


// let container = document.getElementById('chat-messages');
// let chatBox = document.getElementById('input-messege');
// let btn = document.getElementById('btn-send');




// socket.on('chat' , (data) => {
//     let details = `${data.userid}: ${data.messege}`
//     let newWord = document.createElement('h3')
//     newWord.textContent = details
//     container.appendChild(newWord)
// })

