export default function About() {
    return (
        <div className="form--container">
            <h1>Task Management App</h1>
            <h3>Author : Md Fakhruddin Ferdous</h3>
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
                <li>
                    Toggle between light and dark themes to personalize your experience (under construction).
                </li>
                <li>
                    Start and stop tracking time on tasks to measure how much time you spend on them.
                </li>
            </ul>

            <h2>How to Use the App:</h2>
            <ol>
                <li>
                    <strong>Create a Task:</strong> Navigate to the "Create" section to fill out the task form. 
                    Enter the task name and any associated tags (comma-separated).
                </li>
                <li>
                    <strong>View Tasks:</strong> Return to the home page by clicking "Home" top left, to see your list of tasks. Each task will 
                    display its name and associated tags.
                </li>
                <li>
                    <strong>Delete a Task:</strong> When a task is no longer needed, you can delete it directly from 
                    the task list.
                </li>
                <li>
                    <strong>Track Your Tasks:</strong> Each task can be associated with timestamps to help you 
                    keep track of when tasks were created or completed. You can also check the timestamps from the log book by pressing 'View Timestamp' button.
                </li>
                <li>
                    <strong>View Time Spent:</strong> After starting and stopping the timer, you will be able to see the total time spent on each task in hours, minutes, and seconds.
                </li>
            </ol>

            <h2>How to Use the App:</h2>
            <ol>
                <li>Google: to look for the causes of errors and read documentaions.</li>
                <li>Chat-gpt: to get diffetrent views on persistant bugs fixing or get idea in implementing features</li>
            </ol>

            <h2>Hours spent : </h2>
            <p>35 hours approx. in total</p>

            <h2>Github repo :</h2>
            <p>You can see the codes, branches created for features and commit messages here.</p>
            <a target="_blank" href="https://github.com/Ferdousfrd/time-tracker">https://github.com/Ferdousfrd/time-tracker</a>
        </div>
    );
}