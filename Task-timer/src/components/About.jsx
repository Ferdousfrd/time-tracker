export default function About() {
    return (
        <div className="form--container">
            <h1>Task Management App</h1>
            <p>
                Welcome to the Task Management App! This application is designed to help you
                manage your tasks efficiently. Whether you have daily chores, work assignments,
                or personal projects, our app allows you to create, categorize, and track your tasks
                seamlessly.
            </p>
            <h2>Key Features:</h2>
            <ul>
                <li>Create new tasks.</li>
                <li>Assign tags to categorize tasks for better organization.</li>
                <li>View all tasks in a simple, user-friendly interface.</li>
                <li>Delete tasks when they are no longer needed.</li>
                <li>Track your tasks with timestamps to monitor progress.</li>
            </ul>

            <h2>How to Use the App:</h2>
            <ol>
                <li>
                    <strong>Create a Task:</strong> Navigate to the "Create" section to fill out the task form. 
                    Enter the task name and any associated tags (comma-separated).
                </li>
                <li>
                    <strong>View Tasks:</strong> Return to the home page by clicking "Tracker"  top left, to see your list of tasks. Each task will 
                    display its name and associated tags.
                </li>
                <li>
                    <strong>Delete a Task:</strong> When a task is no longer needed, you can delete it directly from 
                    the task list.
                </li>
                <li>
                    <strong>Track Your Tasks:</strong> Each task can be associated with timestamps to help you 
                    keep track of when tasks were created or completed.
                </li>
            </ol>
            <p>
                We hope this app helps you stay organized and productive! If you have any feedback or suggestions,
                please reach out.
            </p>
        </div>
    );
}