const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/MapSpace').then(
  () => console.log("Mongoose Up")
);

const User = require('./schemas/users');

app.use(bodyParser.json());

app.post('/node/login', async (req, res) => {
  const {username, password} = req.body;
  console.log(username, password);
  const resp = await User.find();
  console.log(resp);
  if (!resp) {
    console.log("incorrect details");
    // wrong credentials
  } else {
    console.log("Logged in");
  }
  res.send("F U");

});

app.post('/node/register', (req, res) => {
  console.log(req.body);
  const {username, password} = req.body;
  //store on db
});

app.listen(1234, () => console.log("Server listing at 1234"));

