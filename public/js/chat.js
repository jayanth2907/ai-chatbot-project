const chatBox = document.getElementById("chat");

const userId = localStorage.getItem("userId");

const token = localStorage.getItem("token");


/* LOAD CHAT HISTORY */

async function loadHistory(){

const res = await fetch(`/api/chat/${userId}`,{

headers:{
"Authorization":token
}

});

const chats = await res.json();

chats.forEach(chat => {

chatBox.innerHTML += `
<div class="user">${chat.message}</div>
<div class="bot">${chat.reply}</div>
`;

});

chatBox.scrollTop = chatBox.scrollHeight;

}

loadHistory();


/* SEND MESSAGE */

async function sendMessage(){

const input = document.getElementById("message");

const message = input.value;

if(!message) return;

chatBox.innerHTML += `<div class="user">${message}</div>`;

input.value="";

chatBox.innerHTML += `<div class="typing" id="typing">AI is typing...</div>`;

chatBox.scrollTop = chatBox.scrollHeight;

const res = await fetch("/api/chat",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":token
},

body:JSON.stringify({
message,
userId
})

});

const data = await res.json();

document.getElementById("typing").remove();

chatBox.innerHTML += `<div class="bot">${data.reply}</div>`;

chatBox.scrollTop = chatBox.scrollHeight;

}