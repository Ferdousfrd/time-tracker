import React, { Component } from 'react';
import './App.css'; // Import CSS file
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';
import Analytics from './components/Analytics';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
    };
  }

  // Function to handle recording of activities
  handleActivityRecording = (activity) => {
    const activities = [...this.state.activities, activity];
    this.setState({ activities });
  };

  render() {
    return (
      <div className="App">
        <ActivityForm onActivityRecorded={this.handleActivityRecording} />
        <ActivityList activities={this.state.activities} />
        <Analytics activities={this.state.activities} />
      </div>
    );
  }
}

export default App;