var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.use(bodyParser.json());

//test
app.get('/hello', function(req, res){
  res.send('Hi world! Welcome to funny bot, my name is Boxing')
});

// to verify_token
app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === '1111') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');
  }
});
var token = "EAAP23cqqcdoBABbNwKEEoL8xuRH4M3a3K0QaIsXiZAZBtmHvEbMhRhUvLRSIa4ByeEopwc1NYkkVhpdTSmZBP4HVM9XTzi3HzLr3pEAhpMDpivzW5M9Bf4Gs0bugHqd0H7rVGElDZB9gramY0FU9VSqs1J5QNureqRY8K020KgZDZD";

function sendTextMessage(sender, text){
  messageData = {
    text: text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if(response.body.error){
      console.log('Error: ', response.body.error);
    }
  });
}
// received message
app.post('/webhook/', function(req, res){
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++){
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if(event.message && event.message.text){
      text = event.message.text;
      // handle a text message from thos sender
      console.log(text);
      sendTextMessage(sender, "ê, ku, mày chát là cái này phải hông? : " + text.substring(0, 200));
    }
  }
  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000 );
