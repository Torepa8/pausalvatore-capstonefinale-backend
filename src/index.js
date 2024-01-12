import express from 'express';
import companiesRouter from './routers/companiesRouter.js';
import usersRouter from './routers/usersRouter.js';
import mongoose from 'mongoose';
import list from 'express-list-endpoints';

const server = express();

const port = process.env.PORT || 3030;

//connessione a mongoDB

mongoose.connect(process.env.MONGO_URL).then(() => {
    server.listen(port, () => {
      console.log("😊 Server listening at port:", port)
      console.table(list(server))
    })
  })
  .catch((err) => console.log(err));

server.use(express.json());

server.use('/companies', companiesRouter);
server.use('/users', usersRouter);

// server.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
// });

server.get('/hello', (req, res) => {
    res.json({ messaggio: "Hello Junior Dev" });
});
