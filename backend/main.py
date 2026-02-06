from fastapi import FastAPI, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, schemas, crud
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=False, # Set to False when using wildcard origins to avoid browser blocking
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "HRMS Backend is running!"}

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Auth ---
@app.post("/login", response_model=schemas.Token)
def login(creds: schemas.LoginRequest):
    # Case-insensitive username check
    if creds.username.lower() == "admin" and creds.password == "admin":
        return {"access_token": "admin-mock-token", "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

# --- Employees ---
@app.post("/employees")
def add_employee(emp: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_employee(db, emp)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/employees")
def list_employees(db: Session = Depends(get_db)):
    return crud.get_employees(db)

@app.put("/employees/{emp_id}")
def update_employee(emp_id: int, emp: schemas.EmployeeUpdate, db: Session = Depends(get_db)):
    try:
        updated = crud.update_employee(db, emp_id, emp)
        if not updated:
            raise HTTPException(status_code=404, detail="Employee not found")
        return updated
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/employees/{emp_id}")
def remove_employee(emp_id: int, db: Session = Depends(get_db)):
    emp = crud.delete_employee(db, emp_id)
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"message": "Employee deleted"}

# --- Attendance ---
@app.post("/attendance")
def mark_attendance(att: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_attendance(db, att)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/attendance/{emp_id}")
def view_attendance(emp_id: int, db: Session = Depends(get_db)):
    return crud.get_attendance(db, emp_id)
