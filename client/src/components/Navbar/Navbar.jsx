import { NavLink } from "react-router-dom"

export default function Navbar(){
    return (
        <nav>
            <ul className="flex gap-4">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
            </ul>
        </nav>
    )
}