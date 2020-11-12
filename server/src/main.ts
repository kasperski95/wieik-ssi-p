import 'reflect-metadata';
import express from 'express';
import { connectDatabase } from './config/connect-database';

(async function main() {
  await connectDatabase();
  const app = express();

  app.get('/', function (req, res) {
    res.send('Hello World');
  });

  app.listen(3000);
});
