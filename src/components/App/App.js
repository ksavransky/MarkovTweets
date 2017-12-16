import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import ShowTweets from '../ShowTweets/showTweets.jsx'
import './app.css';

class App extends Component {
  
  componentDidMount(){
    document.addEventListener('keydown', this.enterSubmit.bind(this))
  }
  
  componentWillUnmount(){
    document.removeEventListener('keydown', this.enterSubmit.bind(this))
  }
  
  enterSubmit(event){
    if(event.keyCode === 13) {
      this.getTweets()
    }
  }
  
  getTweets(){
    this.props.actions.twitterSearch(this.refs.search.value === '' ? NOT_REAL_USER : this.refs.search.value)
  }

  render() {
    console.log('in App.js this.props.searchResults');
    console.log(this.props.searchResults);
    return (
      <div id='app'>
        <div id="app-header">
          <h2>Markov Chain Tweets</h2>
        </div>
        <div className='page'>
        <h4>Search For A Twitter User To See Their Tweets</h4>
        <div className='search-container grid-container grid-x align-center'>
          <input ref='search' type="search" placeholder='Search...' className='search cell small-6'/>
          <button className='button' onClick={this.getTweets.bind(this)}>Search</button>
        </div>
        <ShowTweets searchResults={this.props.searchResults}/>
        </div>
      </div>
    );
  }
}

const NOT_REAL_USER = 'notrealman12345654312x'

export default App;
