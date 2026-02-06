import { useState } from "react";
import axios from "axios";
import "./PageStyles.css";

const API_URL = "http://127.0.0.1:8000";

const AddEmployee = () => {
    const [form, setForm] = useState({
        employee_id: "",
        name: "",
        email: "",
        department: "",
    });
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });

        axios.post(`${API_URL}/employees`, form)
            .then(() => {
                setMessage({ type: "success", text: "Employee added successfully!" });
                setForm({ employee_id: "", name: "", email: "", department: "" });
            })
            .catch((err) => {
                setMessage({ type: "error", text: err.response?.data?.detail || "Failed to add employee" });
            });
    };

    return (
        <div className="page-container center-content">
            <div className="card form-card-centered">
                <h2>Add New Employee</h2>
                {message.text && <p className={`message ${message.type}`}>{message.text}</p>}
                <form onSubmit={handleSubmit} className="vertical-form">
                    <div className="form-group">
                        <label>Employee ID</label>
                        <input name="employee_id" value={form.employee_id} onChange={handleChange} required placeholder="e.g. EMP-001" />
                    </div>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="john@example.com" />
                    </div>
                    <div className="form-group">
                        <label>Department</label>
                        <input name="department" value={form.department} onChange={handleChange} required placeholder="Engineering" />
                    </div>
                    <button type="submit" className="action-btn full-width">Add Employee</button>
                </form>
            </div>
        </div>
    );
};

export default AddEmployee;
