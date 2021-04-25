'use strict';

{
  const loginForm = document.getElementById('welcome-form');
  const messagesSection = document.getElementById('messages-section');
  const messagesList = document.getElementById('messages-list');
  const addMessageForm = document.getElementById('add-messages-form');
  const userNameInput = document.getElementById('username');
  const messageContentInput = document.getElementById('message-content');

  let userName;

  const addMessage = (author, content) => {
    const message = document.createElement('li');
    message.classList.add('message', 'message--received');
    if(author === userName) message.classList.add('message--self');
    if(author === 'Chat Bot') message.classList.add('message--chatbot');

    message.innerHTML = `
    <h3 class="message__author">${author === userName ? 'You' : author}</h3>
    <div class="message__content">
    ${content}
    </div>
    `;
    messagesList.appendChild(message);
  };

  // eslint-disable-next-line no-undef
  const socket = io();
  socket.on('message', event => addMessage(event.author, event.content));
  socket.on('addUser', event => addMessage(event.author, event.content));
  socket.on('removeUser', event => addMessage(event.author, event.content));

  const login = event => {
    event.preventDefault();

    if(userNameInput.value){
      // eslint-disable-next-line no-unused-vars
      userName = userNameInput.value;
      socket.emit('login', userName);
      loginForm.classList.toggle('show');
      messagesSection.classList.toggle('show');
    } else {
      alert('You have to provide your nickname!');
    }
  };

  const sendMessage = event => {
    event.preventDefault();

    if(messageContentInput.value){
      addMessage(userName, messageContentInput.value);
      socket.emit('message', { author: userName, content: messageContentInput.value });
      messageContentInput.value = '';
    } else {
      alert('You didn\'t write anything!');
    }
  };

  loginForm.addEventListener('submit', login);
  addMessageForm.addEventListener('submit', sendMessage);
}
