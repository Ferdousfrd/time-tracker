import { Link } from "react-router-dom";
import logo from "../assets/clock.png";

export default function Navbar() {
    return (
        <>
            <nav className="header">
                <img src={logo} alt="clock" className="header--logo" />
                <Link to="/" className="header--title">Tracker</Link>
                <Link to="/about" className="header--about">About</Link>
                <Link to="/settings" className="header--about">Settings</Link>
                <Link to="/create" className="header--about">Create</Link>
            </nav>
        </>
    );
}