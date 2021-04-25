const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

const messages = [];
const users = [];

app.use(express.static(path.join(__dirname, '/client/public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

app.use((req, res) => {
  res.status(404).send('<h1>404 - page not found...</h1>');
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port 8000: http://localhost:8000');
});

const io = socket(server);

io.on('connection', socket => {
  console.log('\nNew client! Its id:', socket.id);

  socket.on('login', user => {
    console.log('Client', socket.id, 'called herself/himself', user);

    const message = {
      author: 'Chat Bot',
      content: `${user} has joined the conversation!`,
    };
    socket.broadcast.emit('addUser', message);

    users.push({
      name: user,
      id: socket.id,
    });
    console.log(users);
  });

  socket.on('message', message => {
    console.log('Oh, I\'ve got something from', message.author);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log(socket.id, 'says goodbye!');
    const user = users.find(user => user.id === socket.id);

    const message = {
      author: 'Chat Bot',
      content: `${user.name} has left the conversation... :(`,
    };
    socket.broadcast.emit('removeUser', message);

    users.splice(users.indexOf(user), 1);
    console.log(users);
  });

  console.log('I\'ve added listeners on login, message and disconnect events.\n');
});
