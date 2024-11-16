console.log('test...');

const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messageDisplay = document.getElementById('messageDisplay');

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
//   socket.send("<<Someone>> Joined");
  messageDisplay.innerHTML  = '<h3>Connected...</h3>';
  
  sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();

    if(message){
        const payload = {sender: 'human', content:message}
        socket.send(JSON.stringify(payload));
    }
  })
  

});

// Listen for messages
socket.addEventListener("message", (event) => {
  console.log("Message from server ", event.data);
//   console.log("Message from server ", event);

  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.innerHTML =
    JSON.parse(event.data).sender + ": " + JSON.parse(event.data).content;
  messageDisplay.appendChild(messageElement);
  messageInput.value = "";
  messageDisplay.scrollTop = messageDisplay.scrollHeight; // Auto-scroll to the bottom
});