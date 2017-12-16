import React, { Component } from 'react';
import _ from 'lodash'
import './markovChainMaker.css';

class MarkovChainMaker extends Component {

  constructor(props){
    super(props)
    this.state = {
      probabilities: null
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

  setInitialProbabilities(nextProps){
    let { tweetIds, numberOfTweets} = nextProps || this.props
  }

  render() {
    console.log('this.state markovChainMaker');
    console.log(this.state);
    return (
      <div>Something</div>
    );
  }
}

export default MarkovChainMaker;