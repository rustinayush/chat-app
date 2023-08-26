const socket = io();
let names;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area");
do {
  names = prompt("Please enter your Name:");
} while (!names);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(value_msg) {
  let msg = {
    user: names,
    message: value_msg.trim(),
  };
  //append
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollTOBottom();

  //Send to server
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `
     <h4>${msg.user}</h4>
     <p>${msg.message}</p>
  `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

//recieve message

socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollTOBottom();
});

function scrollTOBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
