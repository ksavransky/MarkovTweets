import React, { Component } from 'react';
import _ from 'lodash'
import ShowTweet from '../ShowTweet/showTweet.jsx'
import MarkovChainMaker from '../MarkovChainMaker/markovChainMaker.jsx'
import PhraseMaker from '../PhraseMaker/phraseMaker.jsx'
import './showTweets.css';

class ShowTweets extends Component {

  constructor(props){
    super(props)
    this.state = {
      tweetIds: null,
      numberOfTweets: 0,
      markovOrderTweetKeys: false,
      combinedText: ''
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
      let combinedText = this.combineAllSearchText(nextProps.searchResults)
      this.setState({
        tweetIds: tweetIdsObj,
        numberOfTweets: resultTweetArray.length,
        markovOrderTweetKeys: false,
        combinedText: combinedText
      })
    }
  }

  combineAllSearchText(result){ 
    if (result === 'The User Does Not Exist. Please Search Again.') {
      return ''
    }
    let allText = ''
    _.forEach(JSON.parse(result), tweetObj => {
      allText += (tweetObj.text + ' ')
    })
    return allText.replace(/(?:https):\/\/[\n\S]+/g, '')
  }

  parseSearchResultForTweetIds(result){
    if (result === 'The User Does Not Exist. Please Search Again.') {
      return []
    }
    let tweetIds = []
    _.forEach(JSON.parse(result), tweetObj => {
      tweetIds.push(tweetObj['id_str'])
    })
    return tweetIds
  }

  setMarkovOrder(markovOrderArray){
      this.setState({
        markovOrderTweetKeys: markovOrderArray
      })
  }

  render() {
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
          <div id='phrase-maker' className='main-section'>
            <h5>Generate Tweet</h5>
            <div className='divider top'></div>
            <h6>Generate a tweet based on a <a rel="noopener noreferrer" target='_blank' href='https://en.wikipedia.org/wiki/Markov_chain'>Markov Chain</a>, using the text of the lastest ten tweets.</h6>
            <PhraseMaker combinedText={this.state.combinedText}/>
          </div>
          <div id='configure-markov-chain' className='main-section'>
            <h5 className='configure-title'>Configure Tweets Order <div className='configure-subtitle'>Based on a <a rel="noopener noreferrer" target='_blank' href='https://en.wikipedia.org/wiki/Markov_chain'>Markov Chain</a></div></h5>
            <MarkovChainMaker setMarkovOrder={this.setMarkovOrder} numberOfTweets={this.state.numberOfTweets} />
          </div>
          <div id='markov-chain-results' className='main-section'>
            <h5>Reordered Tweets</h5>
              {this.state.markovOrderTweetKeys ? this.state.markovOrderTweetKeys.map((key, index) => <ShowTweet key={index} tweetId={this.state.tweetIds[key]} tweetIndex={key}/>) : ''}
          </div>
        </div>
      )
    }
  }
}

export default ShowTweets;
