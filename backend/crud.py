from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from models import Employee, Attendance

def create_employee(db: Session, emp):
    employee = Employee(
        employee_id=emp.employee_id,
        name=emp.name,
        email=emp.email,
        department=emp.department
    )
    try:
        db.add(employee)
        db.commit()
        db.refresh(employee)
        return employee
    except IntegrityError:
        db.rollback()
        raise ValueError("Employee with this ID or email already exists")

def get_employees(db: Session):
    return db.query(Employee).all()

def delete_employee(db: Session, emp_id: int):
    emp = db.query(Employee).filter(Employee.id == emp_id).first()
    if emp:
        db.delete(emp)
        db.commit()
    return emp

def create_attendance(db: Session, att):
    attendance = Attendance(
        employee_id=att.employee_id,
        date=att.date,
        status=att.status
    )
    db.add(attendance)
    db.commit()
    db.refresh(attendance)
    return attendance

def get_attendance(db: Session, emp_id: int):
    return db.query(Attendance).filter(Attendance.employee_id == emp_id).all()
