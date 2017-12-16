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
      let tweetIdsObj = {}
      resultTweetArray.forEach((tweetId, index) => {
        tweetIdsObj[index + 1] = tweetId
      })
      this.setState({
        tweetIds: tweetIdsObj,
        numberOfTweets: resultTweetArray.length
      })
    }
  }

  parseSearchResultForTweetIds(result){
    if (result === 'The User Does Not Exist. Please Search Again.') {
      return []
    }
    return result.match(/"id_str":"(\d+)","text":"(?!RT)/g).map(str => str.replace(/\D/g,'')).slice(0, 10)
  }

  render() {
    console.log('this.state');
    console.log(this.state);
    if (this.state.tweetIds === null) {
        return (
          ''
        );
    } else if (this.props.searchResults === '[]') {
        return (
          <div id='show-tweets' className='results'>
            'No Tweets Found. Please Search Again.'
          </div>
        );
    } else {
      let tweetsKeys = Object.keys(this.state.tweetIds);
      return (
        <div id='show-tweets' className='results'>
          {tweetsKeys.map(key => <ShowTweet key={key} tweetId={this.state.tweetIds[key]} tweetIndex={key}/>)}
          <div>{this.props.searchResults}</div>
        </div>
      )
    }
  }
}

export default ShowTweets;
