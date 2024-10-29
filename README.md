# Time Tracker

A full-stack **Task Time Tracker** application built with **React** on the frontend and a Node.js/Express backend. The app allows users to track the time spent on tasks, view timestamp logs, and manage tasks with tags.

## Features

- Track time spent on individual tasks with a start/stop timer
- View timestamp logs for each task on a separate page
- Delete tasks as needed
- Backend API for storing tasks, timestamps, and tags
- User-friendly UI with grid-based task layout and responsive design

---

## Getting Started

### Prerequisites

Before cloning the repository, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**

### Cloning the Repository 

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/time-tracker.git
   cd time-tracker

2. Install dependencies for client side:
   ```bash
   time-tracker/Task-timer
   npm install

3. Install dependencies for server side:
   ```bash
   cd time-tracker/server
   npm install

### File structure should be something like this

    time-tracker/
    ├── Task-timer/              # React app
    │   ├── node_modules         # Modules
    │   ├── public/              # Public assets
    │   ├── src/
    │   │   ├── assets/          # imgs, logos 
    │   │   ├── components/      # Components (TaskCard, etc.)
    │   │   ├── style.css        # styles fro the app
    │   │   ├── App.jsx          # App entry point
    │   │   └── main.jsx         # Main entry for React
    │   └── package.json         # Models for database
    │   └── README.txt           # Documentation for the client side(frontEnd)
    ├── server/                  # Backend server
    │   ├── server.js            # Express server
    │   ├── node_modules         # Modules
    │   └── db_file.db           # Database
    │   └── package.json         # Models for database
    │   └── README.txt           # Documentation for the server side(backEnd)
    │   └── etc./              
    └── README.md

### Importing Dependencies

The following key dependencies are used in this project:

1. Frontend (React):
 
- react-router-dom for routing
- @vitejs/plugin-react (if not installed globally with Vite)

2. Backend (Express):
- express for creating the server
- cors to enable cross-origin requests
- body-parser for handling JSON request bodies
(previously used npm install command would take care of all these)

### Running the App

In each directory (frontend and backend), you can use the following scripts:

    npm run dev => Runs the frontend development server (Vite).
    node server.js => Starts the backend server (Express).



Key Features:
Create new tasks.
Assign tags to categorize tasks for better organization.
View all tasks in a simple, user-friendly interface.
Delete tasks when they are no longer needed.
Track your tasks with timestamps to monitor progress.
Toggle between light and dark themes to personalize your experience (under construction).
Start and stop tracking time on tasks to measure how much time you spend on them.

### Usage

1. Create a Task: Navigate to the "Create" section to fill out the task form. Enter the task name and any associated tags (comma-separated).
2. View Tasks: Return to the home page by clicking "Home" top left, to see your list of tasks. Each task will display its name and associated tags.
3. Delete a Task: When a task is no longer needed, you can delete it directly from the task list.
4. Track Your Tasks: Each task can be associated with timestamps to help you keep track of when tasks were created or completed. You can also check the timestamps from the log book by pressing 'View Timestamp' button.
5. View Time Spent: After starting and stopping the timer, you will be able to see the total time spent on each task in hours, minutes, and seconds.

### Troubleshooting

If you encounter connection issues, make sure both servers are running.

If you need to close existing server connections, use:

```bash
  lsof -i :3010
  kill -9 <PID>
  Replace <PID> with the process ID shown.
