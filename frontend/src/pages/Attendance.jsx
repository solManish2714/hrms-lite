import { useState, useEffect } from "react";
import axios from "axios";
import "./PageStyles.css";

const API_URL = "http://127.0.0.1:8000";

const Attendance = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmp, setSelectedEmp] = useState("");
    const [attendance, setAttendance] = useState([]);
    const [form, setForm] = useState({ date: "", status: "Present" });
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get(`${API_URL}/employees`)
            .then(res => setEmployees(res.data));
    }, []);

    const handleEmpChange = (e) => {
        const empId = e.target.value;
        setSelectedEmp(empId);
        if (empId) {
            axios.get(`${API_URL}/attendance/${empId}`)
                .then(res => setAttendance(res.data))
                .catch(() => setAttendance([]));
        } else {
            setAttendance([]);
        }
    };

    const markAttendance = (e) => {
        e.preventDefault();
        if (!selectedEmp) {
            setMessage("Please select an employee");
            return;
        }
        axios.post(`${API_URL}/attendance`, {
            employee_id: selectedEmp,
            date: form.date,
            status: form.status
        })
            .then(() => {
                setMessage("Attendance marked!");
                // Refresh list
                axios.get(`${API_URL}/attendance/${selectedEmp}`)
                    .then(res => setAttendance(res.data));
            })
            .catch((err) => setMessage("Failed to mark attendance"));
    };

    return (
        <div className="page-container">
            <h2>Attendance Management</h2>
            {message && <p className="message info">{message}</p>}

            {/* Horizontal Form */}
            <div className="card full-width">
                <form onSubmit={markAttendance} className="horizontal-form">
                    <div className="form-group-row">
                        <label>Employee</label>
                        <select value={selectedEmp} onChange={handleEmpChange} required>
                            <option value="">-- Select --</option>
                            {employees.map(emp => (
                                <option key={emp.id} value={emp.id}>{emp.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group-row">
                        {/* Display Employee ID based on selection might be tricky purely from select. 
                     Let's just assume we show Name in dropdown. 
                     User requested "emp name and emp id" selection. 
                 */}
                        {selectedEmp && (
                            <div className="badge">
                                ID: {employees.find(e => e.id == selectedEmp)?.employee_id}
                            </div>
                        )}
                    </div>

                    <div className="form-group-row">
                        <label>Date</label>
                        <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
                    </div>

                    <div className="form-group-row">
                        <label>Status</label>
                        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                        </select>
                    </div>

                    <button type="submit" className="action-btn">Mark</button>
                </form>
            </div>

            <div className="attendance-list-container">
                <h3>Attendance Records</h3>
                {selectedEmp ? (
                    attendance.length > 0 ? (
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendance.map(a => (
                                    <tr key={a.id}>
                                        <td>{a.date}</td>
                                        <td className={a.status.toLowerCase()}>{a.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : <p>No records found.</p>
                ) : <p>Select an employee above to view history.</p>}
            </div>
        </div>
    );
};

export default Attendance;
