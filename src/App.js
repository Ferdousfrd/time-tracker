import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import ActivityTracking from './components/ActivityTracking';
import Reports from './components/Reports';
import ActivityList from './components/ActivityList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'home', // Initialize the current view as 'home'
      activities: [], // Initialize the activities array to store recorded activities
    };
  }

  // Function to handle recording activities
  handleActivityRecording = (activity) => {
    const activities = [...this.state.activities, activity]; // Create a new array with the recorded activity
    this.setState({ activities }); // Update the state with the new activities
  };

  // Function to change the current view
  changeView = (view) => {
    this.setState({ currentView: view }); // Set the current view to the specified view
  };

  // Function to delete an activity by index
  onDeleteActivity = (index) => {
    const activities = [...this.state.activities];
    activities.splice(index, 1); // Remove the activity at the specified index
    this.setState({ activities }); // Update the state without the deleted activity
  };

  render() {
    return (
      <div className="App">
        <nav>
          <button onClick={() => this.changeView('home')}>Home</button> {/* Button to switch to the 'Home' view */}
          <button onClick={() => this.changeView('activityTracking')}>Activity Tracking</button> {/* Button to switch to the 'Activity Tracking' view */}
          <button onClick={() => this.changeView('reports')}>Reports</button> {/* Button to switch to the 'Reports' view */}
        </nav>
        {this.state.currentView === 'home' && <Home />} {/* Render the Home component if the current view is 'home' */}
        {this.state.currentView === 'activityTracking' && (
          <ActivityTracking
            onActivityRecorded={this.handleActivityRecording}
            activities={this.state.activities}
            onDeleteActivity={this.onDeleteActivity} // Pass the onDeleteActivity function to the ActivityTracking component
          />
        )}
        {this.state.currentView === 'reports' && (
          <Reports activities={this.state.activities} />
        )}
        {this.state.currentView === 'activityTracking' && (
          <ActivityList activities={this.state.activities} onDeleteActivity={this.onDeleteActivity} />
        )}
      </div>
    );
  }
}

export default App;