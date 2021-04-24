const express = require('express');
const path = require('path');

const app = express();

// eslint-disable-next-line no-unused-vars
const messages = [];

app.use(express.static(path.join(__dirname, '/client/public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

app.use((req, res) => {
  res.status(404).send('<h1>404 - page not found...</h1>');
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port 8000: http://localhost:8000');
});
