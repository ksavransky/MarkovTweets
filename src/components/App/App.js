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
      bigBenTweetsFirstHundred: null,
      bigBenTweetsSecondHundred: null,
      results: []
    }
    this.getUserTimeline = this.getUserTimeline.bind(this)
    this.handleStartDateChange = this.handleStartDateChange.bind(this)
    this.handleEndDateChange = this.handleEndDateChange.bind(this)
    this.gotBigBenTweetsTwice = false
  }

  componentWillMount(){
    // this.getTweets()
    this.getUserTimeline('big_ben_clock')
  }

  componentWillReceiveProps(nextProps){
    console.log('in componentWillReceiveProps');
    if (!_.isEqual(this.props, nextProps)){
      console.log('nextProps');
      console.log(nextProps);

      if (nextProps.timelineResults) {
        let parsedTimelineResultsObject = JSON.parse(nextProps.timelineResults)
        if(!this.state.bigBenTweetsFirstHundred){
          this.setState({bigBenTweetsFirstHundred: parsedTimelineResultsObject})
          console.log('about to send getUserTimeline again with this as max_id:', parsedTimelineResultsObject[99]['id_str']);
          this.getUserTimeline('big_ben_clock', parsedTimelineResultsObject[99]['id_str'])
        } else {
          console.log('in ELSE of this.state.bigBenTweetsFirstHundred and parsedTimelineResultsObject is:', parsedTimelineResultsObject);
          this.setState({bigBenTweetsSecondHundred: parsedTimelineResultsObject})
        }
      }

      // need to write function that parses big ben and gets its last id and adds its tweetsIds to state

      // if (this.state.bigBenTweets && !this.gotBigBenTweetsTwice) {
        // this.getUserTimeline('big_ben_clock', this.state.bigBenTweetIds.slice(-1)[0])
        // this.gotBigBenTweets = true
      // }
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


  getUserTimeline(user, maxId = null){
    this.props.actions.twitterTimeline(user, maxId)
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
    // this.props.actions.twitterSearch('')
  }

  render() {
    console.log('in render - this.state:');
    console.log(this.state);
    // console.log(this.props.searchResults);
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
