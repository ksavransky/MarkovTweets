import React, { Component } from 'react';
import _ from 'lodash'
import './inputRow.css';

const InputRow = ({tweetId, probabilitiesArray}) => {
  let probabilityForTweet = probabilitiesArray.filter(id => id == tweetId).length
  return (
    <div className='probability-input-box'>
      <h6>Tweet {tweetId}</h6>
      <input value={probabilityForTweet}/>
      <h6>{'/' + probabilitiesArray.length}</h6>
    </div>
  )
}

export default InputRow;