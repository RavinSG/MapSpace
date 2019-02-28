const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017').then(
  () => console.log("Mongoose Up")
);
app.use(bodyParser.json());

app.post('/node/register/MapSpace', (req, res) => {
  console.log(req.body);
  const {username, password} = req.body;
  //store on db
});

app.listen(1234, () => console.log("Server listing at 1234"));

