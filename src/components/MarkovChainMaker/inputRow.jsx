import React, { Component } from 'react';
import _ from 'lodash'
import './inputRow.css';

// const InputRow = ({nextTweetId, probabilityArrayAtCurrentLink}) => {
//   let probabilityForNextTweet = probabilityArrayAtCurrentLink.filter(id => id == nextTweetId).length
//   return (
//     <div className='probability-input-box'>
//       <h6>Tweet {nextTweetId}</h6>
//       <input value={probabilityForNextTweet}/>
//       <h6>{'/' + probabilityArrayAtCurrentLink.length}</h6>
//     </div>
//   )
// }

class InputRow extends Component{
   constructor(props){
      super(props);
      this.state = {
        value: this.props.probabilityArrayAtCurrentLink.filter(id => id == this.props.nextTweetId).length
      }
   }
   
   onChange(e){
      const re = /^[0-9\b]+$/;
      if (e.target.value === '' || re.test(e.target.value)) {
         this.setState({value: e.target.value})
      }
   }
   
   render(){
      return (
        <div className='probability-input-box'>
          <h6>Tweet {this.props.nextTweetId}</h6>
          <input value={this.state.value} onChange={this.onChange.bind(this)}/>
          <h6>{'/' + this.props.probabilityArrayAtCurrentLink.length}</h6>
        </div>
      )
   }
}

export default InputRow;