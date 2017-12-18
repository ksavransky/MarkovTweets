import React, { Component } from 'react';
import { connect } from 'react-redux'
import _ from 'lodash'
import './phraseMaker.css';

class PhraseMaker extends Component{
   constructor(props){
      super(props);
      this.state = {
        generatedTweet: '',
        user: document.getElementById('search-input') ? document.getElementById('search-input').value : ''
      }
      this.createNewTweet = this.createNewTweet.bind(this)
   }

  componentDidMount(){
    this.createNewTweet()
  }

  componentWillReceiveProps(nextProps){
    if (!_.isEqual(this.props, nextProps)){
      let userEntered = document.getElementById('search-input')
      this.setState({
        generatedTweet: userEntered.value ===  this.state.user ? nextProps.phraseResults : '',
        user: userEntered ? userEntered.value : ''
      })
    }
  }

  createNewTweet(){
    this.props.actions.generatePhrase(this.props.combinedText);
  }
   
  render(){
    return (
      <div className='phrase-maker-container'>
        <button className='button new-tweet' onClick={this.createNewTweet}>Generate New Tweet</button>
        <div className='generated-tweet'>
          <div className='generated-tweet-user'>@{this.state.user}</div>
          <div className='generated-tweet-text'>{this.state.generatedTweet.slice(1, -1)}</div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    phraseResults: state.main.phraseResults
  }
}

export default connect(
  mapStateToProps
)(PhraseMaker)


