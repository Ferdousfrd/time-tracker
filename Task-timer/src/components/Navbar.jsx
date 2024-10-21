import logo from "../assets/clock.png"

export default function Navbar(){
    return(
        <>
            <nav className="header">
                <img src={logo} alt="clock" className="header--logo"/>      
                <a className="header--title">Tracker</a>
                <a className="header--about">About</a>      
                <a className="header--about">Chores</a>      
                <a className="header--about">Create</a>      
            </nav>   
        </>
    )

}