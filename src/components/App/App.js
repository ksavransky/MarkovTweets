import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './app.css';

class App extends Component {

  render() {
    const { className, ...props } = this.props;
    return (
      <div id='app' {...props}>
        <div id="app-header">
          <h2>Markov Chain Tweets!</h2>
        </div>
        <button onClick={this.props.actions.twitterAuth}>Get Twitter Auth</button>
        <div className='results'>{this.props.results}</div>
      </div>
    );
  }
}

export default App;
