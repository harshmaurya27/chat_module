const socket = io();

const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("messageInput");
const sendMessageButton = document.getElementById("sendMessageButton");
const messagesDiv = document.getElementById("messages");

// Function for  display the messages
function displayMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<span>${message.sender}</span>: ${message.content}`;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Listen for incoming messages from the server
socket.on("receiveMessage", (message) => {
  displayMessage(message);
});

sendMessageButton.onclick = () => {
  const username = usernameInput.value.trim();
  const messageContent = messageInput.value.trim();

  if (!username) {
    alert("Please enter your name");
    return;
  }

  if (!messageContent) {
    alert("Please enter a message");
    return;
  }

  const message = {
    sender: username,
    content: messageContent,
  };

  // Emitting  message to the server
  socket.emit("sendMessage", message);

  messageInput.value = "";
};
