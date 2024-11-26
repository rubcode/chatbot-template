import {getResponseLLM} from './services/chatbot.js'
const formBot = document.querySelector("#formChatbot");

formBot.addEventListener("submit",async function(e){
    e.preventDefault();
    const data = new FormData(this);
    await sendQuestion(data)
    this.reset();
});

async function sendQuestion(data){
    const question = data.get("txtQuestion");
    document.querySelector(".box-faq").classList.add("hide");
    document.querySelector(".box-loader").classList.remove("hide");
    if(question != ""){
        const data = {
            "question" : question
        }
        const response = await getResponseLLM(data);
        if(response.isError){
            console.log("Ocurrio un error")
        }
        const dataResponse = response.data.response
        renderChatContainer(dataResponse)

    }
}

function renderChatContainer(response){
    const chatContainer = document.querySelector(".container-chat");
    const threadDiv = document.createElement('div');
    const splitResponse = response.response.split("Preguntas Sugeridas:")
    const shortResponse = splitResponse[0];
    const FAQ = splitResponse[1];
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
                        <p class="chat-text">${shortResponse}</p>
                    </div>
                </div>`
    threadDiv.innerHTML = html;
    chatContainer.appendChild(threadDiv)
    renderFAQ(FAQ)
}

function renderFAQ(FAQ) {
    const faqList = FAQ.split("\n")
    let html = ''
    if(faqList.length > 0){
        faqList.forEach((element,index) => {
            if(index > 0){
                html += `<li>🔹${element}</li>`
            }
        });
        document.querySelector(".list-faq").innerHTML = html;
        document.querySelector(".box-faq").classList.remove("hide");
        document.querySelector(".box-loader").classList.add("hide");
        window.scrollTo({
            top: document.body.scrollHeight, 
            behavior: 'smooth' 
        });
    }
    
}