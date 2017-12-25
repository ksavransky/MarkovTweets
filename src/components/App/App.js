import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './app.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      test: ''
    }
    this.getTweets = this.getTweets.bind(this)
  }

  componentDidMount(){
    this.getTweets()
  }

  getTweets(){
    this.props.actions.twitterSearch('realdonaldtrump')
  }

  render() {
    console.log(this.props)
    return (
      <div id='app'>
        {this.props.searchResults}
      </div>
    );
  }
}


export default App;
