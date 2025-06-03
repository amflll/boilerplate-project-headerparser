// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// second API endpoint
app.get('/api/whoami', function (req, res) {
  // Get client IP with proper fallback
  let clientIp = req.headers['x-forwarded-for'] || 
                  req.ip ||
                  req.socket.remoteAddress;
  
  // Handle comma-separated IPs in x-forwarded-for
  if (clientIp && clientIp.includes(',')) {
    clientIp = clientIp.split(',')[0].trim();
  }

  res.json({ 
    ipaddress: clientIp,
    language: req.headers['accept-language'] || 'Unknown',
    software: req.headers['user-agent'] || 'Unknown'
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
