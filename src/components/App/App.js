import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './app.css';

class App extends Component {
  
  getTweets(){
    this.props.actions.twitterAuth(this.refs.search.value)
  }

  render() {
    return (
      <div id='app'>
        <div id="app-header">
          <h2>Markov Chain Tweets</h2>
        </div>
        <div className='search-area'>
        <h4>Search For A Twitter User To See Their Tweets</h4>
        <div className='search-container grid-container grid-x align-center'>
          <input ref='search' type="search" placeholder='Search...' className='search cell small-6'/>
          <button className='button' onClick={this.getTweets.bind(this)}>Search</button>
        </div>
        <h5>The Last 10 Tweets Will Be Displayed Below In A <a rel="noopener noreferrer" target='_blank' href='https://en.wikipedia.org/wiki/Markov_chain'>Markov Chain</a></h5>
        <div className='results'>{this.props.results === '[]' ? 'The User Does Not Exist. Please Search Again.' : this.props.results}</div>
        </div>
      </div>
    );
  }
}

export default App;
