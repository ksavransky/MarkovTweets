import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import ShowTweet from '../ShowTweet/showTweet.jsx'
import _ from 'lodash'
import './app.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      startDate: null,
      endDate: null,
      results: []
    }
    this.getTweets = this.getTweets.bind(this)
    this.handleStartDateChange = this.handleStartDateChange.bind(this)
    this.handleEndDateChange = this.handleEndDateChange.bind(this)
  }

  componentDidMount(){
    // this.getTweets()
  }


  componentWillReceiveProps(nextProps){
    if (!_.isEqual(this.props, nextProps) && this.props.searchResults !== '[]'){
      // console.log(nextProps);
      // let tweetIds = []
      // if(nextProps.searchResults){
      //   let parsedObj = JSON.parse(nextProps.searchResults)
      //   console.log('parsedObj');
      //   console.log(parsedObj);
      //   _.forEach(parsedObj.statuses, tweetObj => {
      //     tweetIds.push(tweetObj['id_str'])
      //   })
      // }
      // console.log(tweetIds);
      // this.setState({
      //   results: tweetIds
      // })
    }
  }

  handleStartDateChange(event){
    console.log('in handleStartDateChange', event);
    this.setState({
      startDate: event
    })
  }

  handleEndDateChange(event){
    console.log('in handleEndDateChange', event);
    this.setState({
      endDate: event
    })
  }

  getTweets(){
    // this.props.actions.twitterSearch('realdonaldtrump')
  }

  render() {
    console.log('in render');
    // console.log(this.props.searchResults);
    // console.log(this.state.results);
    return (
      <div id='app'>
      <h3>Stock Sentiment</h3>
      <div id='inputs-container'>
        <div className='dates-container'>
            <label>Start Date and Time</label>
            <DatePicker
             selected={this.state.startDate}
              showTimeSelect
              timeIntervals={60}
              onChange={this.handleStartDateChange}
              timeFormat="HH:mm"
              dateFormat="LLL"
            />
            <label>End Date and Time</label>
            <DatePicker
             selected={this.state.endDate}
              showTimeSelect
              timeIntervals={60}
              onChange={this.handleEndDateChange}
              timeFormat="HH:mm"
              dateFormat="LLL"
            />
        </div>
        <div className='stock-inputs'>
          <label>CashTag</label>
            <input className='input' />
          <label>Stock Name</label>
            <input className='input' />
        </div>
      </div>
      <button className='button' type="button">Search Tweets</button>


      <div className='tweets-results'>
        {this.state.results.map((tweetId, tweetIndex) => <ShowTweet key={tweetIndex} tweetId={tweetId} tweetIndex={tweetIndex}/>)}
      </div>
      </div>
    );
  }
}


export default App;
