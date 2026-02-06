import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

function App() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    employee_id: "",
    name: "",
    email: "",
    department: "",
  });

  const [attendanceForm, setAttendanceForm] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });

  const fetchEmployees = () => {
    setLoading(true);
    axios
      .get(`${API_URL}/employees`)
      .then((res) => {
        setEmployees(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load employees");
        setLoading(false);
      });
  };

  const fetchAttendance = (empId) => {
    if (!empId) return;
    axios
      .get(`${API_URL}/attendance/${empId}`)
      .then((res) => setAttendance(res.data))
      .catch(() => setAttendance([]));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAttendanceChange = (e) => {
    setAttendanceForm({ ...attendanceForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    axios
      .post(`${API_URL}/employees`, form)
      .then(() => {
        setSuccess("Employee added successfully");
        setForm({ employee_id: "", name: "", email: "", department: "" });
        fetchEmployees();
      })
      .catch((err) => {
        setError(err.response?.data?.detail || "Failed to add employee");
      });
  };

  const submitAttendance = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    axios
      .post(`${API_URL}/attendance`, attendanceForm)
      .then(() => {
        setSuccess("Attendance marked successfully");
        fetchAttendance(attendanceForm.employee_id);
      })
      .catch(() => {
        setError("Failed to mark attendance");
      });
  };

  return (
     <div style={{ padding: "40px", maxWidth: "1000px", margin: "auto" }}>

   
      <h1>HRMS Lite</h1>

      {/* ADD EMPLOYEE */}
      <div className="card">

        <h2>Add Employee</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px" }}>
          <input name="employee_id" placeholder="Employee ID" value={form.employee_id} onChange={handleChange} required />
          <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="department" placeholder="Department" value={form.department} onChange={handleChange} required />
          <button type="submit">Add Employee</button>
        </form>
      </div>

      {/* EMPLOYEE LIST */}
      <h2>Employees</h2>

      {loading && <p>Loading...</p>}

      {employees.length > 0 && (
        <table border="1" cellPadding="10" width="100%">
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.employee_id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ATTENDANCE */}
      <div className="card">
        <h2>Mark Attendance</h2>

        <form onSubmit={submitAttendance} style={{ display: "grid", gap: "10px", maxWidth: "400px" }}>
          <select
            name="employee_id"
            value={attendanceForm.employee_id}
            onChange={(e) => {
              handleAttendanceChange(e);
              fetchAttendance(e.target.value);
            }}
            required
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>

          <input type="date" name="date" value={attendanceForm.date} onChange={handleAttendanceChange} required />

          <select name="status" value={attendanceForm.status} onChange={handleAttendanceChange}>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>

          <button type="submit">Mark Attendance</button>
        </form>

        {attendance.length > 0 && (
          <>
            <h3 style={{ marginTop: "20px" }}>Attendance Records</h3>
            <ul>
              {attendance.map((a) => (
                <li key={a.id}>
                  {a.date} — {a.status}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
