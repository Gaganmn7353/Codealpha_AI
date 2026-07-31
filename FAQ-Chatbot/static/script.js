async function send(){

const input = document.getElementById("question");

const text = input.value;

if(text==="") return;

const box = document.getElementById("messages");

box.innerHTML +=
`<div class="user">${text}</div>`;

const response = await fetch("/chat",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
message:text
})

});

const data = await response.json();

box.innerHTML +=
`<div class="bot">${data.reply}</div>`;

box.scrollTop = box.scrollHeight;

input.value="";

}