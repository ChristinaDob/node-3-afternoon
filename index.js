const express = require('express');
const app = express();
const massive = require('massive');
require('dotenv').config();
const bodyParser = require('body-parser');
const products_controller = require('./products_controller');

const { SERVER_PORT, CONNECTION_STRING } = process.env;

massive(CONNECTION_STRING)
  .then(db => {
    app.set('db', db);
    console.log('connected to db');
  })
  .catch(err => console.log(err));

app.use(express.json());

app.post('/api/products', products_controller.create);
app.get('/api/products', products_controller.getAll);
app.get('/api/products/:id', products_controller.getOne);
app.put('/api/products/:id', products_controller.update);
app.delete('/api/products/:id', products_controller.delete);
app.listen(SERVER_PORT, () => {
  console.log(`My server is listening on port ${SERVER_PORT}.`);
});
