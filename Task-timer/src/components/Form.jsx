import { useState } from "react";

export default function Form({ setTasks, fetchTasks }) {
    const [formData, setFormData] = useState({
        taskName: "",
        tags: "",                               // String to hold tag IDs separated by commas
        timestamp: "",                          // String for timestamp
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmission(event) {
        event.preventDefault();
        console.log(formData);                  // For debugging, log the form data

        // Send the data to the server
        const response = await fetch("http://127.0.0.1:3010/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData.taskName,
                tags: formData.tags,            // Assuming tags is a string of IDs like "1,2"
            }),
        });

        if (response.ok) {
            const newTask = await response.json();
            console.log("New task created:", newTask);

             // Call a function to fetch tasks again here
            fetchTasks(); 

            setFormData({ taskName: "", tags: "", timestamp: "" });     // Reset the form
        } else {
            console.error("Failed to create task:", response.statusText);
        }
    }

    return (
        <div className="form--container">
            <h1 className="create--h1">Create new chores:</h1>
            <form onSubmit={handleSubmission} className="create--form">
                <label>
                    Task Name
                    <input
                        type="text"
                        name="taskName"
                        onChange={handleChange}
                        value={formData.taskName}
                    />
                </label>
                <label>
                    Tags (comma-separated ids.)
                    <br />
                    <small>Note : 1=househole-chores, 2=school, 3=hobby, 4=important, <br/>5=full-stack</small>
                    <input
                        placeholder="example: 1, 2"
                        type="text"
                        name="tags"
                        onChange={handleChange}
                        value={formData.tags}
                    />
                </label>
                
                <button className="form--btn">Submit</button>
            </form>
        </div>
    );
}