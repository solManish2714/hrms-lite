import random
from faker import Faker
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
import datetime

# Ensure tables exist
models.Base.metadata.create_all(bind=engine)

fake = Faker()

def seed_data():
    db: Session = SessionLocal()
    
    # Check if data exists
    if db.query(models.Employee).count() > 0:
        print("Data already exists. Skipping seed.")
        db.close()
        return

    departments = ["HR", "Engineering", "Sales", "Marketing", "Finance"]
    employees = []

    print("Seeding Employees...")
    for _ in range(25):
        emp_id = fake.unique.bothify(text='EMP-####')
        emp = models.Employee(
            employee_id=emp_id,
            name=fake.name(),
            email=fake.unique.email(),
            department=random.choice(departments)
        )
        db.add(emp)
        # We need to commit to get the ID for attendance
        db.commit()
        db.refresh(emp)
        employees.append(emp)

    print("Seeding Attendance...")
    # Mark some attendance for last 5 days
    today = datetime.date.today()
    for day_offset in range(5):
        date = today - datetime.timedelta(days=day_offset)
        for emp in employees:
            status = random.choice(["Present", "Present", "Present", "Absent"]) # 75% Present
            att = models.Attendance(
                employee_id=emp.id,
                date=date,
                status=status
            )
            db.add(att)
    
    db.commit()
    print("Seeding Complete!")
    db.close()

if __name__ == "__main__":
    seed_data()
