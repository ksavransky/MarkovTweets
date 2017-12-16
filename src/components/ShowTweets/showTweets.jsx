import React, { Component } from 'react';
import _ from 'lodash'
import ShowTweet from '../ShowTweet/showTweet.jsx'
import MarkovChainMaker from '../MarkovChainMaker/markovChainMaker.jsx'
import './showTweets.css';

class ShowTweets extends Component {

  constructor(props){
    super(props)
    this.state = {
      tweetIds: null,
      numberOfTweets: 0,
      markovOrderTweetKeys: false
    }
    this.setMarkovOrder = this.setMarkovOrder.bind(this)
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
        numberOfTweets: resultTweetArray.length,
        markovOrderTweetKeys: false
      })
    }
  }

  parseSearchResultForTweetIds(result){
    if (result === 'The User Does Not Exist. Please Search Again.') {
      return []
    }
    return result.match(/"id_str":"(\d+)","text":"(?!RT)/g).map(str => str.replace(/\D/g,'')).slice(0, 10)
  }

  setMarkovOrder(markovOrderArray){
      // ["1", "2", "3", "4", "5", "6", "7"]
      this.setState({
        markovOrderTweetKeys: markovOrderArray
      })
  }

  render() {
    console.log('this.state');
    console.log(this.state);
    if (this.state.tweetIds === null) {
        return (
          ''
        );
    } else if (this.props.searchResults === '[]' || this.state.numberOfTweets === 0) {
        return (
          <div id='show-tweets' className='results none'>
            No Tweets Found. Please Search Again.
          </div>
        );
    } else {
      let tweetsKeys = Object.keys(this.state.tweetIds);
      return (
        <div id='main-container' className='main-container grid-x'>
          <div id='show-tweets' className='results main-section'>
            <h5>Latest Ten Tweets</h5>
            {tweetsKeys.map(key => <ShowTweet key={key} tweetId={this.state.tweetIds[key]} tweetIndex={key}/>)}
          </div>
          <div id='configure-markov-chain' className='main-section'>
            <h5>Configure <a rel="noopener noreferrer" target='_blank' href='https://en.wikipedia.org/wiki/Markov_chain'>Markov Chain</a></h5>
            <MarkovChainMaker setMarkovOrder={this.setMarkovOrder} tweetIds={this.state.tweetIds} numberOfTweets={this.state.numberOfTweets} />
          </div>
          <div id='markov-chain-results' className='main-section'>
            <h5>Markov Chain</h5>
              {this.state.markovOrderTweetKeys ? this.state.markovOrderTweetKeys.map((key, index) => <ShowTweet key={index} tweetId={this.state.tweetIds[key]} tweetIndex={key}/>) : ''}
          </div>
        </div>
      )
    }
  }
}

export default ShowTweets;
