import React, { Component } from 'react';
import _ from 'lodash'
import './showTweets.css';
import ShowTweet from '../ShowTweet/showTweet.jsx'

class ShowTweets extends Component {

  constructor(props){
    super(props)
    this.state = {
      tweetIds: null,
      numberOfTweets: 0
    }
  }


  componentWillReceiveProps(nextProps){
    if (!_.isEqual(this.props, nextProps) && this.props.searchResults !== '[]'){
      let resultTweetArray = this.parseSearchResultForTweetIds(nextProps.searchResults)
      let tweetIds = {}
      resultTweetArray.forEach((tweetId, index) => {
        tweetIds[index + 1] = tweetId
      })
      this.setState({
        tweetIds: tweetIds,
        numberOfTweets: resultTweetArray.length
      })
    }
  }

  parseSearchResultForTweetIds(result){
    return result.split('","text"')
    .map(str => str.slice(-25).match(/[0-9]+/))
    .filter(el => el !== null )
    .map(ary => ary[0])
  }

  createTweetDisplay(tweetId, index){
    // <TweetEmbed id='940554567414091776' options={{conversation: 'none' }}></TweetEmbed>
  }

  render() {
    console.log('this.state');
    console.log(this.state);
    if (this.props.searchResults === '[]') {
        return (
          <div id='show-tweets' className='results'>
            'No Tweets Found. Please Search Again.'
          </div>
        );
    } else if (this.state.tweetIds === null) {
        return (
          ''
        );
    } else {
      return (
        <div id='show-tweets' className='results'>
          <ShowTweet tweet={this.state.tweetIds[0]} />
          {this.props.searchResults}
        </div>
      )
    }
  }
}

export default ShowTweets;
