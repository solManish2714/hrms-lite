from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional

class EmployeeCreate(BaseModel):
    employee_id: str
    name: str
    email: EmailStr
    department: str

class EmployeeUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    department: Optional[str] = None

class AttendanceCreate(BaseModel):
    employee_id: int
    date: date
    status: str

class LoginRequest(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
