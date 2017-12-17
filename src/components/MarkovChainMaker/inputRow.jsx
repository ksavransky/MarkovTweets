import React, { Component } from 'react';
import _ from 'lodash'
import './inputRow.css';

const InputRow = ({nextTweetId, probabilityArrayAtCurrentLink}) => {
  let probabilityForNextTweet = probabilityArrayAtCurrentLink.filter(id => id == nextTweetId).length
  return (
    <div className='probability-input-box'>
      <h6>Tweet {nextTweetId}</h6>
      <input value={probabilityForNextTweet}/>
      <h6>{'/' + probabilityArrayAtCurrentLink.length}</h6>
    </div>
  )
}

export default InputRow;