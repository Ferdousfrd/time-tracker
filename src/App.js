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

  // Function to handle the deletion of activities
  handleDeleteActivity = (index) => {
    const updatedActivities = [...this.state.activities];
    updatedActivities.splice(index, 1); // Remove the activity at the specified index
    this.setState({ activities: updatedActivities });
  };

  render() {
    return (
      <div className="App">
        <ActivityForm onActivityRecorded={this.handleActivityRecording} />
        <ActivityList activities={this.state.activities} onDeleteActivity={this.handleDeleteActivity} />
        <Analytics activities={this.state.activities} />
      </div>
    );
  }
}

export default App;