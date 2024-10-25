import { Link, useLocation } from "react-router-dom";
import logo from "../assets/clock.png";

export default function Navbar({ toggleTheme }) {
    const location = useLocation();
    const isOnCreateOrAboutPage = location.pathname === '/create' || location.pathname === '/about';
    return (
        <>
            <nav className="header">
                <img src={logo} alt="clock" className="header--logo" />
                <Link to="/" className="header--title">{isOnCreateOrAboutPage ? "Home" : "Tracker"}</Link>
                <Link to="/about"  className="header--about">About</Link>
                <Link to="/create" className="header--about">Create</Link>
                <a onClick={toggleTheme} className="header--about">Theme</a>
            </nav>
        </>
    );
}