var express = require('express');

var app = express();
app.use(express.urlencoded());

//var resp = new twilio.TwimlResponse();
var client = require('twilio')('AC3f8a551e83ab8aa94eb596e3124aa217', 'ce75df6359361ad50ded04323d14041c');
console.log('running')
var count = 0
client.messages.list({
  'From' : '+17142999802',
}, function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(count);
    data.messages.forEach(function(message) {
        console.log(++count);
        console.log('Date: ' + message.dateSent + ' Message from: ' + message.from + ' with body: ' + message.body);
    });
    console.log('now stalling');
  }
});
/*
client.messages.list({
  'dateSent>': '2015-03-01',
}, function(err, data) {
  if (err) {
    console.log(err);
  } else {
    data.messages.forEach(function(message) {
        console.log('Message to: ' + message.to + ' with body: ' + message.body);
    });
  }
});*/


/*client.messages.get(function (err, response) {
    response.messages.forEach(function(message) {
        console.log('Message to: ' + message.to + ' with body: ' + message.body);

    });
}); */
/*
client.accounts('AC...').calls.get(function (err, response) {
    response.calls.forEach(function(call) {
        console.log('Received call from: ' + call.from);
        console.log('This call\'s unique ID is: ' + call.sid);
    });
}); */

/*
app.post('/inbound', function(request, response) {
    response.type('text/xml');
    response.send('<Response><Say>Hello there! Thanks for calling.</Say></Response>');
}); */

app.listen(3000);