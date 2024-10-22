import { useState } from "react";

export default function Form() {
    const [formData, setFormData] = useState({
        taskName: "",
        tags: "", // Assuming tags are a comma-separated string of tag IDs
        timestamp: "", // Assuming you want to use a string for the timestamp
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    function handleSubmission(event) {
        event.preventDefault(); // Prevent default form submission
        console.log(formData); // Log the form data
    }

    return (
        <>
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
                    Tags (comma-separated IDs)
                    <input
                        type="text"
                        name="tags"
                        onChange={handleChange}
                        value={formData.tags}
                    />
                </label>

                <label>
                    Timestamp
                    <input
                        type="datetime-local"
                        name="timestamp" // Change to 'datetime-local' for date/time input
                        onChange={handleChange}
                        value={formData.timestamp}
                    />
                </label>

                <button className="form--btn">Submit</button>
            </form>
        </>
    );
}