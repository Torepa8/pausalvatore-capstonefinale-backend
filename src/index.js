import express from 'express';
import companiesRouter from './routers/companiesRouter.js';
import usersRouter from './routers/usersRouter.js';
import locandineRouter from './routers/locandineRouter.js';
import mongoose from 'mongoose';
import list from 'express-list-endpoints';
import { User } from './models/users.js';
import cors from 'cors';

const server = express();

server.use(cors());

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
server.use('/locandine', locandineRouter);

server.get('/hello', (req, res) => {
  res.json({ messaggio: "Hello Junior Dev" });
});
