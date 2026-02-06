from sqlalchemy.orm import Session
import models, schemas

def create_employee(db: Session, emp: schemas.EmployeeCreate):
    # Check if exists
    if db.query(models.Employee).filter(models.Employee.employee_id == emp.employee_id).first():
        raise ValueError("Employee ID already exists")
    if db.query(models.Employee).filter(models.Employee.email == emp.email).first():
        raise ValueError("Email already exists")
    
    db_emp = models.Employee(
        employee_id=emp.employee_id, 
        name=emp.name, 
        email=emp.email, 
        department=emp.department
    )
    db.add(db_emp)
    db.commit()
    db.refresh(db_emp)
    return db_emp

def get_employees(db: Session):
    return db.query(models.Employee).all()

def update_employee(db: Session, emp_id: int, emp_update: schemas.EmployeeUpdate):
    db_emp = db.query(models.Employee).filter(models.Employee.id == emp_id).first()
    if not db_emp:
        return None
    
    if emp_update.name:
        db_emp.name = emp_update.name
    if emp_update.email:
        # Check uniqueness if email changes
        existing = db.query(models.Employee).filter(models.Employee.email == emp_update.email).first()
        if existing and existing.id != emp_id:
            raise ValueError("Email already in use")
        db_emp.email = emp_update.email
    if emp_update.department:
        db_emp.department = emp_update.department
        
    db.commit()
    db.refresh(db_emp)
    return db_emp

def delete_employee(db: Session, emp_id: int):
    db_emp = db.query(models.Employee).filter(models.Employee.id == emp_id).first()
    if db_emp:
        db.delete(db_emp)
        db.commit()
    return db_emp

def create_attendance(db: Session, att: schemas.AttendanceCreate):
    # Verify employee exists
    if not db.query(models.Employee).filter(models.Employee.id == att.employee_id).first():
        raise ValueError("Employee not found")

    db_att = models.Attendance(employee_id=att.employee_id, date=att.date, status=att.status)
    db.add(db_att)
    db.commit()
    db.refresh(db_att)
    return db_att

def get_attendance(db: Session, emp_id: int):
    return db.query(models.Attendance).filter(models.Attendance.employee_id == emp_id).all()
