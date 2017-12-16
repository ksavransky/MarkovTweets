import React, { Component } from 'react';
import _ from 'lodash'
import './markovChainMaker.css';

class MarkovChainMaker extends Component {

  constructor(props){
    super(props)
    this.state = {
      probabilities: null,
      startingLink: 1
    }
    this.setInitialProbabilities = this.setInitialProbabilities.bind(this)
  }

  componentDidMount(){
    this.setState({
      probabilities: this.setInitialProbabilities()
    })
  }

  componentWillReceiveProps(nextProps){
    if (!_.isEqual(this.props, nextProps)){
      this.setState({
        probabilities: this.setInitialProbabilities(nextProps)
      })
    }
  }

  setInitialProbabilities (nextProps) {
    let { numberOfTweets } = nextProps || this.props
    let numberArray = [];
    for (let i = 1; i <= numberOfTweets; i++){
        numberArray.push(i);
    }
    let probabilities = {}
    for (let j = 1; j <= numberOfTweets; j++) {
      probabilities[j] = numberArray
    }
    return probabilities
  }

  createChain () {
    let chain = [this.state.startingLink.toString()]
    let stepProbabilityArray = this.state.probabilities[this.state.startingLink]
    for (let i = 1; i < this.props.numberOfTweets; i++){
      let randTweetId = stepProbabilityArray[Math.floor(Math.random() * stepProbabilityArray.length)];
      chain.push(randTweetId.toString())
      stepProbabilityArray = this.state.probabilities[randTweetId]
    }
    this.props.setMarkovOrder(chain)
  }

  setStartingLink(){
    let newStartingLinkValue = parseInt(this.refs.startingLinkDropDown.value)
    if (newStartingLinkValue !== this.state.startingLink) {
      this.setState({
        startingLink: newStartingLinkValue
      })
    }
  }

  getStartingLinkDropDown(numberOfTweets) {
    let numberArray = [];
    for (let i = 1; i <= numberOfTweets; i++){
      numberArray.push(i);
    }

    return (
      <div className='first-link-container'>
        <h6>Starting Link</h6>
        <select onChange={this.setStartingLink.bind(this)} ref='startingLinkDropDown'>
          {numberArray.map(key => <option key={key} selected={this.state.startingLink === key ? 'selected' : '' } value={key}>Tweet {key}</option>)}
        </select>
      </div>
    )
  }

  render() {
    console.log('this.state markovChainMaker');
    console.log(this.state);
    return (
      <div id='config-container'>
        <button className='button create-chain' onClick={this.createChain.bind(this)}>Create Chain</button>
        {this.getStartingLinkDropDown(this.props.numberOfTweets)}
      </div>
    );
  }
}

export default MarkovChainMaker;