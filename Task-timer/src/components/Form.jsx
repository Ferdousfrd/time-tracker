import { useState } from "react"

export default function Form(){

    const[formData, setformData] = useState({
        taskName : "",
        description: "", 
    })


    function handleChange(event){                               

        const {name, value} = event.target      
        setformData(prevName => {
            return {
                ...prevName,              
                [name] : value,  
            }    
        })                                      
    
    }

    function handleSubmition(event){
        event.preventDefault()                                  // this prevents the web to send data by default. we wanna run our own function
        console.log(formData)                                   // we just logging the data now. But we will send this formdata in api usually or do whatever we want
    }

    return (

        <>

        <h1 className="create--h1">Create new chores :</h1>

        <form onSubmit={handleSubmition} className="create--form">
            <label>Task Name
            <input 
                type="text"
                name="taskName"                 // this name should be same as our state name. it allows use to use event.target.name
                onChange={handleChange}         // onChange works for every key stroke changing
                value={formData.taskName}
            />
            </label>

            <label>Description
            <textarea
                                                    // textarea in React is selfclosed element. Its same like input except
                name="description"                  // it doesnt have 'type' property
                value={formData.description}
                onChange={handleChange}
            />
            </label>
           
            <button className="form--btn">Submit</button>

        </form>

        </>
    )
}