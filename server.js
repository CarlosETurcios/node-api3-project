const express = require('express');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
const server = express();
server.use(express.json());
server.use(logger);
server.use('/api/user', userRouter);
server.use('/api/post', postRouter);
server.get('/', (req, res) => {
  const nameInsert = req.name ? `${req}` : '';
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${new Date()} ${req.method} to ${req.url} `);
  next();
}
server.use((error, req, res, next) => {
  res.status(400).json({ message: '', error });
});
module.exports = server;
