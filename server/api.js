const api = module.exports = require('express').Router()

var Twitter = require('twitter-node-client').Twitter;
var MarkovChain = require('markovchain');

function twitterSearch(req, res){
  const config = {
      "consumerKey": "PiRcOvzzbivfKnwfU67DPui31",
      "consumerSecret": "XDk6pegf6ojDZHtVlaB0ndmBHkmW7vH5v5WXOrY3o6yM37YhzC",
      "accessToken": "831991073610174464-kyCUce44Jtg0TTDqfnM4RPAfBnGplpJ",
      "accessTokenSecret": "6SrIYkogDnJgNtATcfGKdkCyH0KhfVoghvixJG0yrsNUW",
      "callBackUrl": "http://localhost:3000/"
  }
  var twitter = new Twitter(config);
  var error = function (err, response, body) {
    // console.log('ERROR - err:', err);
    // console.log('ERROR - response:', response);
    res.status(500).send(err);
  };
  var success = function (data) {
    // console.log('Data [%s]', data);
    res.status(200).send(data);
  };
  twitter.getUserTimeline({ screen_name: req.query.userName, count: '10'}, error, success);
}

function generatePhrase(req, res){
  console.log('in generatePhrase');
  console.log(req.query.text)
  var success = function (phrase) {
    // console.log('Data [%s]', data);
    res.status(200).send(phrase);
  };
  
  var chain = new MarkovChain(req.query.text);
  console.log('chain')
  console.log(chain)
  
  var useUpperCase = function(wordList) {
    var tmpList = Object.keys(wordList).filter(function(word) {
      return word[0] >= 'A' && word[0] <= 'Z'
    })
    return tmpList[~~(Math.random()*tmpList.length)]
  }
  
  var phrase = chain.start(useUpperCase).process();
  
  console.log('phrase')
  console.log(phrase)
  success(phrase);
}

api
  .get('/twitter-search', twitterSearch) 
  .get('/generate-phrase', generatePhrase) 
// No routes matched? 404.
api.use((req, res) => res.status(404).end())


