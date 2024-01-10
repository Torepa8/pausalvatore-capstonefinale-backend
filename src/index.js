import express from 'express';

const server = express();

const port = 3030;

server.use(express.json());

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

server.get('/hello', (req, res) => {
  res.json({messaggio:"Hello Junior Dev"});
});
