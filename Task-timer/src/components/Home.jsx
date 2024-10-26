import React, { useState } from 'react';
import TaskCard from './TaskCard';

const Home = ({ tasks, tags, timestamps, setTasks }) => {

    const [notify, setNotify] = useState("")

    const handleDelete = async (id) => {
        const response = await fetch(`http://127.0.0.1:3010/tasks/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            // Remove the task from the state
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));

            setNotify(`Task with id ${id} deleted`);               // notify the deletation for better UX
            setTimeout(() => setNotify(""), 3000);                // show notification then hides after 3 sec
        } else {
            setNotify("Failed to delete task:", response.statusText);            
            setTimeout(() => setNotify(""), 3000); 
        }
    };

    return (
        <div className="container">
            {notify && (                          // notifying after new task got created
                <div className="notification">
                    {notify}
                </div>
            )}
            <h1>Tasks</h1>
            <div className="task-grid">
                {tasks.map(task => {
                // Get the associated timestamps and tags for each task
                const taskTimestamps = timestamps.filter(ts => ts.task === task.id);
                const taskTags = tags.filter(tag => task.tags.split(',').includes(tag.id.toString()));

                return (
                    <TaskCard 
                    key={task.id} 
                    task={task} 
                    tags={taskTags} 
                    timestamps={taskTimestamps} 
                    onDelete={handleDelete}
                    />
                );
                })}
            </div>
        </div>
    );
};

export default Home;