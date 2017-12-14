import React, { Component } from 'react';
import TweetEmbed from 'react-tweet-embed'
import _ from 'lodash'
import './showTweets.css';

class ShowTweets extends Component {


  componentWillReceiveProps(nextProps){
console.log(this.props);
console.log(nextProps);
    if (!_.isEqual(this.props, nextProps)){

    }
  }

  displayTweet(tweetId){
    // <TweetEmbed id='832671149704114176' options={{conversation: 'none' }} />
    // <TweetEmbed id={tweetId} options={{conversation: 'none' }} />
  }
  render() {
    if (this.props.searchResults === '[]') {
        return (
          <div id='show-tweets' className='results'>
            'No Tweets Found. Please Search Again.'
          </div>
        );
    } else {
      return (
        <div id='show-tweets' className='results'>
          {this.props.searchResults}
        </div>
      );
    }

  }
}

export default ShowTweets;
