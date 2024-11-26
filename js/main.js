import {getResponseLLM} from './services/chatbot.js'
const formBot = document.querySelector("#formChatbot");

formBot.addEventListener("submit",function(e){
    e.preventDefault();
    const data = new FormData(this);
    sendQuestion(data)
    this.reset();
});

function sendQuestion(data){
    const question = data.get("txtQuestion");
    if(question != ""){
        const data = {
            "question" : question
        }
        const response = getResponseLLM(data);
        renderChatContainer(response)

    }
}

function renderChatContainer(response){
    const chatContainer = document.querySelector(".container-chat");
    const threadDiv = document.createElement('div');
    const html = ` <div class="thread-chat">
                    <div class="box-chat user">
                        <p class="chat-text">${response.question}</p>
                        <div class="box-avatar">
                            <div class="avatar">
                                <img src="src/worker.jpg" alt="User">
                            </div>
                            
                        </div>
                    </div>
                    <div class="box-chat bot">
                        <div class="box-avatar">
                            <div class="avatar">
                                <img src="src/Cablin.png" alt="User">
                            </div>
                        </div>
                        <p class="chat-text">${response.response}</p>
                    </div>
                </div>`
    threadDiv.innerHTML = html;
    chatContainer.appendChild(threadDiv)
}