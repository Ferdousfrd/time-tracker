Activity Tracker App

Introduction

The Activity Tracker app is a single-page web application built with React. It allows users to record different activities, track the time spent on each activity, and display analytics about the total time spent on each activity. In this documentation, we'll explain how the app works and the steps to create it.

Features

• Recording activities with start and stop times.
• Displaying recorded activities with their starting and stopping times.
• Providing analytics showing the total time spent on each activity.
• Deleting recorded activities.

Technologies Used

• React: A JavaScript library for building user interfaces.
• HTML and CSS: For structuring and styling the web page.

Step-by-Step Creation

Step 1: Project Setup

1. Create a new React project using create-react-app or your preferred method.
2. Create the necessary components for your app, including ActivityForm, ActivityList, and Analytics.
   Step 2: Creating ActivityForm
3. In the ActivityForm component, set up the component state to manage the activity name, start time, and tracking status.
4. Create functions to handle the start/stop button click and activity name input change.
5. When the "Start" button is clicked, record the start time and display a "Recording started" message. When the "Stop" button is clicked, record the end time, and the "Recording stopped" message is displayed.
6. Pass the recorded activity to the parent component (App) using a callback function (onActivityRecorded).
   Step 3: Creating App
7. In the App component, set up the component state to manage the list of recorded activities.
8. Create a function to handle the recording of activities. This function receives an activity from the ActivityForm component and adds it to the list of recorded activities.
9. Create a function to delete recorded activities from the list.
10. Render the ActivityForm, ActivityList, and Analytics components, passing the necessary data and functions as props.
    Step 4: Creating ActivityList
11. In the ActivityList component, receive the list of recorded activities as a prop.
12. Map through the list of activities and display them in a list format.
13. Add a "Delete" button for each recorded activity and a function to handle the delete action.
14. Display the starting and stopping times for each recorded activity.
    Step 5: Creating Analytics
15. In the Analytics component, receive the list of recorded activities as a prop.
16. Calculate the total time spent on each activity by subtracting the start time from the end time for each activity.
17. Display the analytics in a table format, showing the activity name and the total time spent in seconds.
    Step 6: Styling
18. Style the app using CSS. You can modify the CSS file to improve the visual appearance of the app.
19. Add styling to elements such as headers, input fields, buttons, and table cells to make the app more visually appealing.
    Step 7: Testing
20. Test the app by running it and recording activities.
21. Ensure that the recorded activities are displayed correctly in the list, and the analytics show the total time spent on each activity.
22. Test the delete feature to ensure that recorded activities can be removed from the list.

Conclusion

The Activity Tracker app is a simple yet effective way to record and analyze your daily activities. It demonstrates the use of React components, state management, and basic user interaction. You can further enhance the app by adding features like data persistence and user authentication for a more robust application.
