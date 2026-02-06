import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (!user) return null;

    return (
        <nav className="navbar">
            <div className="navbar-brand">HRMS Lite</div>
            <div className="navbar-links">
                <Link to="/add-employee" className="nav-link">Add Employee</Link>
                <Link to="/view-employees" className="nav-link">View Employees</Link>
                <Link to="/manage-employees" className="nav-link">Update/Delete</Link>
                <Link to="/attendance" className="nav-link">Attendance</Link>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
