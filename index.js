// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.use(bodyParser.urlencoded({extended: false}))

app.get('/api', (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  })
})

app.get('/api/:timestamp', (req, res) => {
  const timestamp = req.params.timestamp

  if(!isNaN(Number(timestamp)) && timestamp.length === 13){
    return res.json({
      unix: Number(timestamp),
      utc: new Date(Number(timestamp)).toUTCString()
    })
  }

  if(new Date(timestamp).toUTCString() !== 'Invalid Date'){
    return res.json({
      unix: new Date(timestamp).getTime(),
      utc: new Date(timestamp).toUTCString()
    })
  }else{
    return res.json({
      error: "Invalid Date"
    })
  }
})





// Listen on port set in environment constiable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
