import React, { Component } from 'react';
import { connect } from 'react-redux'
import _ from 'lodash'
import './phraseMaker.css';

class PhraseMaker extends Component{
   constructor(props){
      super(props);
      this.state = {
        generatedTweet: ''
      }
   }

  componentDidMount(){
    this.props.actions.generatePhrase(this.props.combinedText);
  }

  componentWillReceiveProps(nextProps){
    if (!_.isEqual(this.props, nextProps)){
      this.setState({
        generatedTweet: nextProps.phraseResults
      })
    }
  }
   
 render(){
    return (
      <div className='phrase-maker-container'>
        {this.state.generatedTweet}
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