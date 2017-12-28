const api = module.exports = require('express').Router()
var Twitter = require('twitter-node-client').Twitter;

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
    console.log('ERROR - err:', err);
    console.log('ERROR - response:', response);
    res.status(500).send(err);
  };
  var success = function (data) {
    console.log('Data [%s]', data);
    res.status(200).send(data);
  };

  if (req.query.cashTag !== '') {
    twitter.getSearch({ 'q': ('$' + req.query.cashTag), 'since_id': req.query.sinceId, 'max_id': req.query.maxId, 'count': '100', 'exclude_replies': 'true'}, error, success);
  } else {
    twitter.getSearch({ 'q': ('$' + req.query.stockString), 'since_id': req.query.sinceId, 'max_id': req.query.maxId, 'count': '100', 'exclude_replies': 'true'}, error, success);
  }
  // twitter.getUserTimeline({ screen_name: req.query.userName, count: '10'}, error, success);
  // twitter.getUserTimeline({ screen_name: 'big_ben_clock', count: '100', exclude_replies: 'true'}, error, success);
  // twitter.getSearch({'q':'$WTW', 'since_id':'945624910898122752', 'max_id': '945780569388015616', 'lang': 'en', 'count': '100', 'exclude_replies': 'true'}, error, success);
}


function twitterTimeline(req, res){
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
  if (req.query.maxId !== 'null') {
    twitter.getUserTimeline({ screen_name: req.query.userName, max_id: req.query.maxId, count: '100', exclude_replies: 'true'}, error, success);
  } else {
    twitter.getUserTimeline({ screen_name: req.query.userName, count: '100', exclude_replies: 'true'}, error, success);
  }
}


api
  .get('/twitter-search', twitterSearch)
  .get('/twitter-timeline', twitterTimeline)
// No routes matched? 404.
api.use((req, res) => res.status(404).end())
