import React from 'react';
import TaskCard from './TaskCard';

const Home = ({ tasks, tags, timestamps, setTasks }) => {

    const handleDelete = async (id) => {
        const response = await fetch(`http://127.0.0.1:3010/tasks/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            // Remove the task from the state
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
            console.log(`Task with id ${id} deleted`);
        } else {
            console.error("Failed to delete task:", response.statusText);
        }
    };

    return (
        <div className="container">
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