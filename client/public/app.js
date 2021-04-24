'use strict';

{
  const loginForm = document.getElementById('welcome-form');
  const messagesSection = document.getElementById('messages-section');
  const messagesList = document.getElementById('messages-list');
  const addMessageForm = document.getElementById('add-messages-form');
  const userNameInput = document.getElementById('username');
  const messageContentInput = document.getElementById('message-content');

  let userName;

  const login = event => {
    event.preventDefault();

    if(userNameInput.value){
      // eslint-disable-next-line no-unused-vars
      userName = userNameInput.value;
      loginForm.classList.toggle('show');
      messagesSection.classList.toggle('show');
    } else {
      alert('You have to provide your nickname!');
    }
  };

  const addMessage = (author, content) => {
    const message = document.createElement('li');
    message.classList.add('message', 'message--received');
    if(author === userName) message.classList.add('message--self');

    message.innerHTML = `
      <h3 class="message__author">${author === userName ? 'You' : author}</h3>
      <div class="message__content">
        ${content}
      </div>
    `;

    messagesList.appendChild(message);
  };

  const sendMessage = event => {
    event.preventDefault();

    if(messageContentInput.value){
      addMessage(userName, messageContentInput.value);
      messageContentInput.value = '';
    } else {
      alert('You didn\'t write anything!');
    }
  };

  loginForm.addEventListener('submit', login);
  addMessageForm.addEventListener('submit', sendMessage);
}