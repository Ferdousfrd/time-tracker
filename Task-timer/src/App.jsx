import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Form from "./components/Form"
import TagsList from "./components/Tags"
import TasksList from "./components/Tasks"
import TimestampList from "./components/TimestampsList"
import "./style.css"

export default function App() {

  return (
    <>
      <Navbar />

      <div>
        <TagsList />
        <TasksList />
        <TimestampList />
      </div>

      <Footer /> 
    </>
  )
}


