import React, { Component } from 'react';
import TweetEmbed from 'react-tweet-embed'
import _ from 'lodash'
import './showTweets.css';

class ShowTweets extends Component {

constructor(props){
  super(props)
  this.state = {
    tweetIds: null
  }
}


  componentWillReceiveProps(nextProps){
    if (!_.isEqual(this.props, nextProps) && this.props.searchResults !== '[]'){
      this.setState({
        // tweetIds: nextProps.searchResults.match(/id_str(.*)text/)
        tweetIds: nextProps.searchResults.split('","text"')
            .map(str => str.slice(-25).match(/[0-9]+/)).filter(el => el !== null ).map(ary => ary[0])
      })
    }
  }

  getEmbeddedTweet(tweetId){
    // <TweetEmbed id='"940554567414091776"' options={{conversation: 'none' }} />
    // <TweetEmbed id={tweetId} options={{conversation: 'none' }} />
  }

  render() {
    console.log('this.state.tweetIds');
    console.log(this.state.tweetIds);
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
