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
      currentView: 'home',
      activities: [],
    };
  }

  handleActivityRecording = (activity) => {
    const activities = [...this.state.activities, activity];
    this.setState({ activities });
  };

  changeView = (view) => {
    this.setState({ currentView: view });
  };

  onDeleteActivity = (index) => {
    const activities = [...this.state.activities];
    activities.splice(index, 1);
    this.setState({ activities });
  };

  render() {
    return (
      <div className="App">
        <nav>
          <button onClick={() => this.changeView('home')}>Home</button>
          <button onClick={() => this.changeView('activityTracking')}>Activity Tracking</button>
          <button onClick={() => this.changeView('reports')}>Reports</button>
        </nav>
        {this.state.currentView === 'home' && <Home />}
        {this.state.currentView === 'activityTracking' && (
          <ActivityTracking
            onActivityRecorded={this.handleActivityRecording}
            activities={this.state.activities}
          />
        )}
        {this.state.currentView === 'reports' && <Reports activities={this.state.activities} />}
        {this.state.currentView === 'activityTracking' && (
          <ActivityList activities={this.state.activities} onDeleteActivity={this.onDeleteActivity} />
        )}
      </div>
    );
  }
}

export default App;