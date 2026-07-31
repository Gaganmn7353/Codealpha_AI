const input = document.getElementById("inputText");

const output = document.getElementById("outputText");

const from = document.getElementById("fromLang");

const to = document.getElementById("toLang");

const translateBtn = document.getElementById("translateBtn");

const copyBtn = document.getElementById("copyBtn");

const speakBtn = document.getElementById("speakBtn");

const clearBtn = document.getElementById("clearBtn");

translateBtn.addEventListener("click", async () => {

let text = input.value.trim();

if(text===""){

alert("Enter text first");

return;

}

const url =
`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from.value}|${to.value}`;

try{

const response = await fetch(url);

const data = await response.json();

output.value =
data.responseData.translatedText;

}
catch{

alert("Translation failed.");

}

});

copyBtn.addEventListener("click",()=>{

navigator.clipboard.writeText(output.value);

alert("Copied!");

});

speakBtn.addEventListener("click",()=>{

let speech =
new SpeechSynthesisUtterance(output.value);

speech.lang = to.value;

window.speechSynthesis.speak(speech);

});

clearBtn.addEventListener("click",()=>{

input.value="";

output.value="";

});