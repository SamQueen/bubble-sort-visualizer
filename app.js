//jshint eversion:6

const express = require('express');

const app = express();

app.use(express.static("public"));

app.get('/', function(req, res) {
   res.sendFile(__dirname + "/"); 
});

app.listen('3000', function() {
   console.log('Connected to port 3000'); 
});