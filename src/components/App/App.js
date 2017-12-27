import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import ShowTweet from '../ShowTweet/showTweet.jsx'
import _ from 'lodash'
import './app.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      results: []
    }
    this.getTweets = this.getTweets.bind(this)
  }

  componentDidMount(){
    this.getTweets()
  }


  componentWillReceiveProps(nextProps){
    if (!_.isEqual(this.props, nextProps) && this.props.searchResults !== '[]'){
      // console.log(nextProps);
      let tweetIds = []
      if(nextProps.searchResults){
        let parsedObj = JSON.parse(nextProps.searchResults)
        console.log('parsedObj');
        console.log(parsedObj);
        _.forEach(parsedObj.statuses, tweetObj => {
          tweetIds.push(tweetObj['id_str'])
        })
      }
      console.log(tweetIds);
      this.setState({
        results: tweetIds
      })
    }
  }

  getTweets(){
    this.props.actions.twitterSearch('realdonaldtrump')
  }

  render() {
    console.log('in render');
    // console.log(this.props.searchResults);
    console.log(this.state.results);
    return (
      <div id='app'>
        {this.props.searchResults}
        {this.state.results.map((tweetId, tweetIndex) => <ShowTweet key={tweetIndex} tweetId={tweetId} tweetIndex={tweetIndex}/>)}
      </div>
    );
  }
}


export default App;
