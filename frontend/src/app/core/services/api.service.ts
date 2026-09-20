import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    DashboardStats, Department, Student, Teacher,
    AttendanceRecord, AttendanceRequest, AttendanceSummary,
    MarksRecord, MarksRequest
} from '../../shared/models/models';

@Injectable({ providedIn: 'root' })
export class ApiService {
    private baseUrl = 'http://localhost:8080/api';

    constructor(private http: HttpClient) { }

    // ── Dashboard ──────────────────────────────────────────────
    getDashboardStats(): Observable<DashboardStats> {
        return this.http.get<DashboardStats>(`${this.baseUrl}/dashboard/stats`);
    }

    // ── Departments ────────────────────────────────────────────
    getDepartments(): Observable<Department[]> {
        return this.http.get<Department[]>(`${this.baseUrl}/admin/departments`);
    }
    getDepartment(id: number): Observable<Department> {
        return this.http.get<Department>(`${this.baseUrl}/admin/departments/${id}`);
    }
    createDepartment(dept: Department): Observable<Department> {
        return this.http.post<Department>(`${this.baseUrl}/admin/departments`, dept);
    }
    updateDepartment(id: number, dept: Department): Observable<Department> {
        return this.http.put<Department>(`${this.baseUrl}/admin/departments/${id}`, dept);
    }
    deleteDepartment(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/admin/departments/${id}`);
    }

    // ── Students (Admin) ──────────────────────────────────────
    getStudents(): Observable<Student[]> {
        return this.http.get<Student[]>(`${this.baseUrl}/admin/students`);
    }
    getStudent(id: number): Observable<Student> {
        return this.http.get<Student>(`${this.baseUrl}/admin/students/${id}`);
    }
    createStudent(student: Student): Observable<Student> {
        return this.http.post<Student>(`${this.baseUrl}/admin/students`, student);
    }
    updateStudent(id: number, student: Student): Observable<Student> {
        return this.http.put<Student>(`${this.baseUrl}/admin/students/${id}`, student);
    }
    deleteStudent(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/admin/students/${id}`);
    }
    searchStudents(query: string): Observable<Student[]> {
        return this.http.get<Student[]>(`${this.baseUrl}/admin/students/search?query=${query}`);
    }

    // ── Teachers (Admin) ──────────────────────────────────────
    getTeachers(): Observable<Teacher[]> {
        return this.http.get<Teacher[]>(`${this.baseUrl}/admin/teachers`);
    }
    getTeacher(id: number): Observable<Teacher> {
        return this.http.get<Teacher>(`${this.baseUrl}/admin/teachers/${id}`);
    }
    createTeacher(teacher: Teacher): Observable<Teacher> {
        return this.http.post<Teacher>(`${this.baseUrl}/admin/teachers`, teacher);
    }
    updateTeacher(id: number, teacher: Teacher): Observable<Teacher> {
        return this.http.put<Teacher>(`${this.baseUrl}/admin/teachers/${id}`, teacher);
    }
    deleteTeacher(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/admin/teachers/${id}`);
    }
    searchTeachers(query: string): Observable<Teacher[]> {
        return this.http.get<Teacher[]>(`${this.baseUrl}/admin/teachers/search?query=${query}`);
    }

    // ── Teacher endpoints ─────────────────────────────────────
    getTeacherStudents(): Observable<Student[]> {
        return this.http.get<Student[]>(`${this.baseUrl}/teacher/students`);
    }
    markAttendance(request: AttendanceRequest): Observable<AttendanceRecord> {
        return this.http.post<AttendanceRecord>(`${this.baseUrl}/teacher/attendance`, request);
    }
    getTeacherAttendance(teacherId: number): Observable<AttendanceRecord[]> {
        return this.http.get<AttendanceRecord[]>(`${this.baseUrl}/teacher/attendance/teacher/${teacherId}`);
    }
    addMarks(request: MarksRequest): Observable<MarksRecord> {
        return this.http.post<MarksRecord>(`${this.baseUrl}/teacher/marks`, request);
    }
    getTeacherMarks(teacherId: number): Observable<MarksRecord[]> {
        return this.http.get<MarksRecord[]>(`${this.baseUrl}/teacher/marks/teacher/${teacherId}`);
    }

    // ── Student endpoints ─────────────────────────────────────
    getStudentProfile(id: number): Observable<Student> {
        return this.http.get<Student>(`${this.baseUrl}/student/profile/${id}`);
    }
    getStudentAttendance(studentId: number): Observable<AttendanceRecord[]> {
        return this.http.get<AttendanceRecord[]>(`${this.baseUrl}/student/attendance/${studentId}`);
    }
    getStudentAttendanceSummary(studentId: number): Observable<AttendanceSummary> {
        return this.http.get<AttendanceSummary>(`${this.baseUrl}/student/attendance/summary/${studentId}`);
    }
    getStudentMarks(studentId: number): Observable<MarksRecord[]> {
        return this.http.get<MarksRecord[]>(`${this.baseUrl}/student/marks/${studentId}`);
    }
}
