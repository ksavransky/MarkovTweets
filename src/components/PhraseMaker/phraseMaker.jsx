import React, { Component } from 'react';
import _ from 'lodash'
import './phraseMaker.css';

class PhraseMaker extends Component{
   constructor(props){
      super(props);
      this.state = {
        value: ''
      }
   }

  componentWillReceiveProps(nextProps){
    if (!_.isEqual(this.props, nextProps)){
      // this.setState({
      //   value: ''
      // })
    }
  }
   
 render(){
    console.log('this.props.combinedText');
    console.log(this.props.combinedText);
    return (
      <div className='phrase-maker-container'>
hi
      </div>
    )
 }
}

export default PhraseMaker;