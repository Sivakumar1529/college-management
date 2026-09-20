export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    username: string;
    role: string;
    refId: number;
}

export interface DashboardStats {
    totalStudents: number;
    totalTeachers: number;
    totalDepartments: number;
    totalAttendanceRecords: number;
}

export interface Department {
    id?: number;
    name: string;
    code: string;
    description?: string;
}

export interface Student {
    id?: number;
    name: string;
    email: string;
    phone?: string;
    dob?: string;
    address?: string;
    department?: Department;
    semester?: string;
    enrollmentNo: string;
}

export interface Teacher {
    id?: number;
    name: string;
    email: string;
    phone?: string;
    qualification?: string;
    specialization?: string;
    department?: Department;
}

export interface AttendanceRecord {
    id?: number;
    student: Student;
    teacher: Teacher;
    date: string;
    status: 'PRESENT' | 'ABSENT' | 'LATE';
    subject: string;
}

export interface AttendanceRequest {
    studentId: number;
    teacherId: number;
    date: string;
    status: 'PRESENT' | 'ABSENT' | 'LATE';
    subject: string;
}

export interface AttendanceSummary {
    totalClasses: number;
    presentCount: number;
    absentCount: number;
    lateCount: number;
    attendancePercentage: number;
}

export interface MarksRecord {
    id?: number;
    student: Student;
    teacher: Teacher;
    subject: string;
    marksObtained: number;
    totalMarks: number;
    examType: 'INTERNAL' | 'EXTERNAL' | 'LAB';
}

export interface MarksRequest {
    studentId: number;
    teacherId: number;
    subject: string;
    marksObtained: number;
    totalMarks: number;
    examType: 'INTERNAL' | 'EXTERNAL' | 'LAB';
}
