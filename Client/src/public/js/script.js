class Home {
    constructor(){
        this.socket = io.connect('/')
        this.conversation();
    }
    
    async login(){
        
        window.location.href = '/group'
    }

    sendMessage(){
        let messege = $('#input-messege').val()
        this.socket.emit('messege' ,{ messege:  messege})
        $('#input-messege').val('Sent!')
    }
    conversation(){
        this.socket.on('online', (data) => {
            $('.member-online').text(data)
            console.log(data)
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

