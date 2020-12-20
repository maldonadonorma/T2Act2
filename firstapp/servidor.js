var express = require('express');
var app = express();

app.use(express.static('public'));
app.use(express.static('compartidos'));

  app.get('/', function (req, res) {
    res.send('Hello World!');
  });


  app.post('/', function (req, res) {
    res.send('Got a POST request');
  });


  app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user');
  });


  app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user');
  });