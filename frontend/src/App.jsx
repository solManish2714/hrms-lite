import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import AddEmployee from "./pages/AddEmployee";
import EmployeeList from "./pages/EmployeeList";
import ManageEmployee from "./pages/ManageEmployee";
import Attendance from "./pages/Attendance";
import "./index.css";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function AppRoutes() {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/view-employees" replace />} />

          <Route path="/add-employee" element={
            <ProtectedRoute>
              <AddEmployee />
            </ProtectedRoute>
          } />

          <Route path="/view-employees" element={
            <ProtectedRoute>
              <EmployeeList />
            </ProtectedRoute>
          } />

          <Route path="/manage-employees" element={
            <ProtectedRoute>
              <ManageEmployee />
            </ProtectedRoute>
          } />

          <Route path="/attendance" element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
