import { useEffect, useState } from "react";
import axios from "axios";
import "./PageStyles.css";

const API_URL = "http://127.0.0.1:8000";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    // Vertical Filters
    const [filters, setFilters] = useState({
        id: "",
        name: "",
        email: ""
    });

    const fetchEmployees = () => {
        setLoading(true);
        axios.get(`${API_URL}/employees`)
            .then(res => {
                setEmployees(res.data);
                setFilteredEmployees(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    // Initial fetch
    useEffect(() => {
        fetchEmployees();
    }, []);

    // Manual Filter Logic
    const handleSearch = () => {
        const result = employees.filter(emp =>
            (filters.id === "" || emp.employee_id.toLowerCase().includes(filters.id.toLowerCase())) &&
            (filters.name === "" || emp.name.toLowerCase().includes(filters.name.toLowerCase())) &&
            (filters.email === "" || emp.email.toLowerCase().includes(filters.email.toLowerCase()))
        );
        setFilteredEmployees(result);
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="page-container">
            <h2>View Employees</h2>

            <div className="horizontal-filters-container">
                <div className="filter-group">
                    <input name="id" placeholder="Filter by Employee ID" value={filters.id} onChange={handleFilterChange} />
                </div>
                <div className="filter-group">
                    <input name="name" placeholder="Filter by Name" value={filters.name} onChange={handleFilterChange} />
                </div>
                <div className="filter-group">
                    <input name="email" placeholder="Filter by Email" value={filters.email} onChange={handleFilterChange} />
                </div>
                <button onClick={handleSearch} className="action-btn">Search</button>
            </div>

            {loading ? <p>Loading...</p> : (
                <div className="table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.length > 0 ? (
                                filteredEmployees.map(emp => (
                                    <tr key={emp.id}>
                                        <td>{emp.employee_id}</td>
                                        <td>{emp.name}</td>
                                        <td>{emp.email}</td>
                                        <td>{emp.department}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="4">No employees found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EmployeeList;
