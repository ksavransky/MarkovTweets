import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import ShowTweet from '../ShowTweet/showTweet.jsx'
import _ from 'lodash'
import './app.css';

const hoursInAWeek = 168

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      startDate: null,
      endDate: null,
      startTimeTweetId: null,
      endTimeTweetId: null,
      startHoursAgo: null,
      bigBenTweetsFirstHundred: null,
      bigBenTweetsSecondHundred: null,
      resultTweets: null
    }
    this.getUserTimeline = this.getUserTimeline.bind(this)
    this.handleStartDateChange = this.handleStartDateChange.bind(this)
    this.handleEndDateChange = this.handleEndDateChange.bind(this)
  }

  componentWillMount(){
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
          this.getUserTimeline('big_ben_clock', parsedTimelineResultsObject[99]['id_str'])
        } else {
          this.setState({bigBenTweetsSecondHundred: parsedTimelineResultsObject})
        }
      }
    }
  }


  getUserTimeline(user, maxId = null){
    this.props.actions.twitterTimeline(user, maxId)
  }


  handleStartDateChange(event){
    let hoursAgo = Math.round(event.diff(new Date()) / -3600000)
    if (hoursAgo >= 0 && (hoursAgo < hoursInAWeek - 1)) {
      let bigBenId
      if (hoursAgo < 100) {
        bigBenId = this.state.bigBenTweetsFirstHundred[hoursAgo]['id_str']
      } else {
        bigBenId = this.state.bigBenTweetsSecondHundred[hoursAgo - 100]['id_str']
      }
      this.setState({
        startDate: event,
        startTimeTweetId: bigBenId,
        startHoursAgo: hoursAgo
      })
    } else {
      this.setState({
        startDate: null,
        startTimeTweetId: null,
        startHoursAgo: null
      })
    }
  }

  handleEndDateChange(event){
    let hoursAgo = Math.round(event.diff(new Date()) / -3600000)
    if (hoursAgo < this.state.startHoursAgo && hoursAgo < hoursInAWeek) {
      let bigBenId
      if (hoursAgo < 100) {
        bigBenId = this.state.bigBenTweetsFirstHundred[hoursAgo]['id_str']
      } else {
        bigBenId = this.state.bigBenTweetsSecondHundred[hoursAgo - 100]['id_str']
      }
      this.setState({
        endDate: event,
        endTimeTweetId: bigBenId
      })
    } else {
      this.setState({
        endDate: null,
        endTimeTweetId: null
      })
    }
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
          {!this.state.resultTweets ? '' : this.state.resultTweets.map((tweetId, tweetIndex) => <ShowTweet key={tweetIndex} tweetId={tweetId} tweetIndex={tweetIndex}/>)}
        </div>
      </div>
    );
  }
}


export default App;
