import React, { Component } from 'react';

class ActivityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityName: '',
      startTime: null,
      isTracking: false,
    };
  }

  // Handle the start/stop button click
  handleStartStopClick = () => {
    if (this.state.isTracking) {
      // Stop tracking
      this.setState({
        isTracking: false,
        startTime: null,
      });
    } else {
      // Start tracking
      this.setState({
        isTracking: true,
        startTime: new Date(),
      });
    }
  };

  // Handle activity name input change
  handleActivityNameChange = (event) => {
    this.setState({ activityName: event.target.value });
  };

  render() {
    return (
      <div>
        <h2>Activity Tracker</h2>
        <div>
          <input
            type="text"
            placeholder="Enter activity name"
            value={this.state.activityName}
            onChange={this.handleActivityNameChange}
          />
          <button onClick={this.handleStartStopClick}>
            {this.state.isTracking ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>
    );
  }
}

export default ActivityForm;