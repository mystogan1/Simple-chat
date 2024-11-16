console.log('test...');

const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messageDisplay = document.getElementById('messageDisplay');
const onlineUsers = document.getElementById("onlineUsers");

// Optional: Send message on pressing Enter key
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
    sendButton.click();
    }
});

// Replace with your server URL
const socket = new WebSocket("wss://my-websocket-sasi.glitch.me/");

// Connection opened
socket.addEventListener("open", (event) => {
    messageDisplay.innerHTML = 'You will not see past messages';

  sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();

    if(message){
        const payload = {type: 'message', user: 'Human', content:message, }
        socket.send(JSON.stringify(payload));
    }
  })


})

// Listen for messages
socket.addEventListener("message", (event) => {
  console.log("Message from server ", event.data);

  const data = JSON.parse(event.data);
  if(data.type == 'userCount'){
      onlineUsers.innerHTML = "Online: " + data.count;
  }
  
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  if(data.type=='message'){
      messageElement.innerHTML =
        JSON.parse(event.data).user + ": " + JSON.parse(event.data).content;
      messageDisplay.appendChild(messageElement);
      messageInput.value = "";
      messageDisplay.scrollTop = messageDisplay.scrollHeight; // Auto-scroll to the bottom
  }
});

