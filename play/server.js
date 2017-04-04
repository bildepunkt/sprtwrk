var express = require('express');
var path = require('path');

var app = express();
var port = 2048;

app.use(express.static('play'));

app.listen(port, function () {
  console.log('Spritewerk Play listening on port ' + port + '!');
});
