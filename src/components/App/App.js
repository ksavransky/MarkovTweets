import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import ShowTweets from '../ShowTweets/showTweets.jsx'
import TweetEmbed from 'react-tweet-embed'
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
        <TweetEmbed id='940554567414091776' options={{conversation: 'none' }}></TweetEmbed>
        <h5>The Lastest Ten Available Tweets Will Be Displayed Below In A <a rel="noopener noreferrer" target='_blank' href='https://en.wikipedia.org/wiki/Markov_chain'>Markov Chain</a></h5>
        <ShowTweets searchResults={this.props.searchResults}/>
        </div>
      </div>
    );
  }
}

const NOT_REAL_USER = 'notrealman12345654312x'

export default App;