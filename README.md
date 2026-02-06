HRMS Lite – Full Stack Application

A lightweight Human Resource Management System (HRMS) built as a full‑stack web application. This project was developed as part of a company assessment and demonstrates end‑to‑end development, deployment, and debugging of a real‑world application.

🚀 Live Demo

* Frontend (UI): https://hrms-frontend-fw47.onrender.com/
* Backend (API Docs): https://hrms-backend-f12a.onrender.com/docs


🛠️ Tech Stack

Frontend

* React (Vite)
* JavaScript
* Axios
* HTML & CSS
* Render (Static Site Hosting)

Backend

* Python
* FastAPI
* SQLAlchemy
* SQLite (for simplicity)
* Uvicorn
* Render (Web Service Hosting)


✨ Features

Employee Management

* Add new employees
* View all employees in a table
* Prevent duplicate employee IDs or emails

Attendance Management

* Mark employee attendance (Present / Absent)
* View attendance records per employee

Deployment & Production

* Fully deployed backend API
* Fully deployed frontend UI
* Proper CORS handling for production
* Live API documentation via Swagger

## 📂 Project Structure

hrms-lite/
│
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── database.py
│   ├── requirements.txt
│
├── frontend/
│   ├── src/
│   │   └── App.jsx
│   ├── index.html
│   ├── package.json
│
├── README.md


⚙️ How It Works

1. The **React frontend** communicates with the **FastAPI backend** using REST APIs.
2. Employee and attendance data are stored in a database using SQLAlchemy.
3. The backend exposes APIs for CRUD operations.
4. The frontend consumes these APIs using Axios.
5. Both frontend and backend are deployed on **Render**.


 🧪 API Endpoints (Backend)

| Method | Endpoint                  | Description            |
| ------ | ------------------------- | ---------------------- |
| GET    | /employees                | Get all employees      |
| POST   | /employees                | Add new employee       |
| POST   | /attendance               | Mark attendance        |
| GET    | /attendance/{employee_id} | Get attendance records |


🧠 Key Learnings

* Full‑stack integration (React + FastAPI)
* Production deployment on Render
* Handling CORS issues correctly
* Debugging real deployment problems
* GitHub‑based CI/CD workflow


📌 Future Improvements

* Authentication & role‑based access
* Pagination & search for employees
* Export attendance reports
* Improved UI styling

👤 Author

Manish Kumar
GitHub: https://github.com/solManish2714

✅ Status

✔ Completed
✔ Fully Deployed
✔ Production Ready
