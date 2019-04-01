// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var dotenv = require('dotenv');
dotenv.config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/:dateString?", function (req, res) {
  
  if(req.params.dateString){
    var dateStr = req.params.dateString;
    if(new Date(dateStr).toString() != 'Invalid Date'){
      var date = new Date(dateStr);
      res.json({unix: date.getTime(), utc: date.toUTCString()});
    } else {
      res.json({error: 'Invalid Date'});
    }
  } else {
    var timeNow = new Date(Date.now());
    res.json({unix: timeNow.getTime(), utc: timeNow.toUTCString()});
  }
  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});