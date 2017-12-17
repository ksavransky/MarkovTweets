import React, { Component } from 'react';
import InputRow from './inputRow.jsx'
import _ from 'lodash'
import './markovChainMaker.css';


class MarkovChainMaker extends Component {

  constructor(props){
    super(props)
    this.state = {
      probabilities: null,
      startingLink: 1,
      tweetIdArray: null,
      probabilityLink: 1
    }
    this.setInitialProbabilities = this.setInitialProbabilities.bind(this)
    this.getStartingLinkDropDown = this.getStartingLinkDropDown.bind(this)
    this.getProbabiltyForm = this.getProbabiltyForm.bind(this)
    this.getProbabiltyInputs = this.getProbabiltyInputs.bind(this)
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

  setInitialProbabilities(nextProps){
    let { numberOfTweets } = nextProps || this.props
    let tweetIdArray = [];
    for (let i = 1; i <= numberOfTweets; i++){
        tweetIdArray.push(i);
    }
    this.setState({
      tweetIdArray: tweetIdArray
    })
    let probabilities = {}
    for (let j = 1; j <= numberOfTweets; j++) {
      probabilities[j] = tweetIdArray
    }
    return probabilities
  }

  createChain(){
    let chain = [this.state.startingLink.toString()]
    let stepProbabilityArray = this.state.probabilities[this.state.startingLink]
    for (let i = 1; i < this.props.numberOfTweets; i++){
      let randTweetId = stepProbabilityArray[Math.floor(Math.random() * stepProbabilityArray.length)];
      chain.push(randTweetId.toString())
      stepProbabilityArray = this.state.probabilities[randTweetId]
    }
    this.props.setMarkovOrder(chain)
  }

  setProbabilityLink(){
    let newProbabilityLinkValue = parseInt(this.refs.probabilityLinkDropDown.value)
    if (newProbabilityLinkValue !== this.state.probabilityLink) {
      this.setState({
        probabilityLink: newProbabilityLinkValue
      })
    }
  }

  getProbabiltyInputs(){
    return (
      <div className='probability-inputs-container' ref='probabilityInputs'>
          <div className='probability-labels'>
            <h6>Next Tweet</h6>
            <h6>Probability</h6>
          </div>
          {this.state.tweetIdArray ? this.state.tweetIdArray.map(key => <InputRow key={key} tweetId={key} probabilitiesArray={this.state.probabilities[key]} />) : ''}
      </div>
    );
  }

  getProbabiltyForm(){
    return (
      <div className='probability-form-container'>
        <div className='divider'></div>
        <h5 className='change-probabilities-label'>Change Probabilities</h5>
        <div className='explanation'>Choose a link (i.e. tweet) and set probabilities for the which link will appear next.</div>
        <div className='input-pair'>
          <h6>Set Link</h6>
          <select onChange={this.setProbabilityLink.bind(this)} ref='probabilityLinkDropDown'>
            {this.state.tweetIdArray ? this.state.tweetIdArray.map(key => <option key={key} selected={this.state.probabilityLink === key ? 'selected' : '' } value={key}>Tweet {key}</option>) : ''}
          </select>
        </div>
        {this.getProbabiltyInputs()}
      </div>
    )
  }

  setStartingLink(){
    let newStartingLinkValue = parseInt(this.refs.startingLinkDropDown.value)
    if (newStartingLinkValue !== this.state.startingLink) {
      this.setState({
        startingLink: newStartingLinkValue
      })
    }
  }

  getStartingLinkDropDown(){
    return (
      <div className='input-pair'>
        <h6>Starting Link</h6>
        <select onChange={this.setStartingLink.bind(this)} ref='startingLinkDropDown'>
          {this.state.tweetIdArray ? this.state.tweetIdArray.map(key => <option key={key} selected={this.state.startingLink === key ? 'selected' : '' } value={key}>Tweet {key}</option>) : ''}
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
        {this.getProbabiltyForm()}
      </div>
    );
  }
}

export default MarkovChainMaker;