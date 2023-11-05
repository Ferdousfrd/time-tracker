import React, { Component } from 'react';

class ActivityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityName: '',
      startTime: null,
      isTracking: false,
      recordingMessage: '', // Added recordingMessage state
    };
  }

  // Handle the start/stop button click
  handleStartStopClick = () => {
    if (this.state.isTracking) {
      // Stop tracking
      const endTime = new Date(); // Record the end time
      const activity = {
        name: this.state.activityName,
        startTime: this.state.startTime,
        endTime: endTime, // Add the end time to the activity
      };

      this.props.onActivityRecorded(activity); // Pass the activity to the parent component

      this.setState({
        isTracking: false,
        startTime: null,
        activityName: '', // Clear the activity name
        recordingMessage: '', 
      });
    } else {
      // Start tracking
      this.setState({
        isTracking: true,
        startTime: new Date(),
        recordingMessage: 'Recording started', // Display recording started message
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
          <div>{this.state.recordingMessage}</div> {/* Display recording message */}
        </div>
      </div>
    );
  }
}

export default ActivityForm;