import { useEffect, useState } from "react";
import axios from "axios";
import "./PageStyles.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const ManageEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [message, setMessage] = useState("");

    // Horizontal Filters
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

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        fetchEmployees();
    }, []);

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

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            axios.delete(`${API_URL}/employees/${id}`)
                .then(() => {
                    setMessage("Employee deleted successfully");
                    fetchEmployees();
                })
                .catch((err) => setMessage("Failed to delete"));
        }
    };

    // ... edit handlers ...
    const startEdit = (emp) => {
        setEditingId(emp.id);
        setEditForm(emp);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    const handleEditChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const saveEdit = () => {
        axios.put(`${API_URL}/employees/${editingId}`, editForm)
            .then(() => {
                setMessage("Employee updated successfully");
                setEditingId(null);
                fetchEmployees();
            })
            .catch((err) => setMessage(err.response?.data?.detail || "Failed to update"));
    };

    return (
        <div className="page-container">
            <h2>Update / Delete Employees</h2>
            {message && <p className="message success">{message}</p>}

            <div className="horizontal-filters-container">
                <input name="id" placeholder="Filter by ID" value={filters.id} onChange={handleFilterChange} />
                <input name="name" placeholder="Filter by Name" value={filters.name} onChange={handleFilterChange} />
                <input name="email" placeholder="Filter by Email" value={filters.email} onChange={handleFilterChange} />
                <button onClick={handleSearch} className="action-btn">Search</button>
            </div>

            {loading ? <p>Loading...</p> : (
                <div className="table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map(emp => (
                                <tr key={emp.id}>
                                    {editingId === emp.id ? (
                                        <>
                                            <td>{emp.employee_id}</td>
                                            <td><input name="name" value={editForm.name} onChange={handleEditChange} /></td>
                                            <td><input name="email" value={editForm.email} onChange={handleEditChange} /></td>
                                            <td><input name="department" value={editForm.department} onChange={handleEditChange} /></td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button onClick={saveEdit} className="btn-save">Save</button>
                                                    <button onClick={cancelEdit} className="btn-cancel">Cancel</button>
                                                </div>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{emp.employee_id}</td>
                                            <td>{emp.name}</td>
                                            <td>{emp.email}</td>
                                            <td>{emp.department}</td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button onClick={() => startEdit(emp)} className="btn-edit">Edit</button>
                                                    <button onClick={() => handleDelete(emp.id)} className="btn-delete">Delete</button>
                                                </div>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageEmployee;
