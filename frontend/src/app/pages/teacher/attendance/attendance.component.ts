import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { Student, AttendanceRecord, AttendanceRequest } from '../../../shared/models/models';

@Component({
    selector: 'app-teacher-attendance',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="page">
      <div class="page-header">
        <div>
          <h1>Mark Attendance</h1>
          <p>Record student attendance for today's classes</p>
        </div>
      </div>

      <div class="card form-card">
        <form (ngSubmit)="onMarkAttendance()" class="inline-form">
          <div class="form-group">
            <label>Student</label>
            <select [(ngModel)]="form.studentId" name="studentId" required>
              <option value="">Select Student</option>
              <option *ngFor="let s of students" [value]="s.id">{{ s.name }} ({{ s.enrollmentNo }})</option>
            </select>
          </div>
          <div class="form-group">
            <label>Date</label>
            <input type="date" [(ngModel)]="form.date" name="date" required>
          </div>
          <div class="form-group">
            <label>Subject</label>
            <input type="text" [(ngModel)]="form.subject" name="subject" required placeholder="e.g. Java Programming">
          </div>
          <div class="form-group">
            <label>Status</label>
            <select [(ngModel)]="form.status" name="status" required>
              <option value="PRESENT">Present</option>
              <option value="ABSENT">Absent</option>
              <option value="LATE">Late</option>
            </select>
          </div>
          <div class="form-actions-inline">
            <button type="submit" class="btn-primary" [disabled]="!form.studentId || !form.date || !form.subject">Mark Attendance</button>
          </div>
        </form>
      </div>

      <div class="card table-card mt-4">
        <div class="card-header">
          <h3>Recent Attendance Records</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Student</th>
              <th>Subject</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let a of attendanceRecords">
              <td>{{ a.date }}</td>
              <td class="name-cell">{{ a.student.name }} <span class="text-sm">({{ a.student.enrollmentNo }})</span></td>
              <td>{{ a.subject }}</td>
              <td>
                <span class="status-badge" [ngClass]="a.status.toLowerCase()">{{ a.status }}</span>
              </td>
            </tr>
            <tr *ngIf="attendanceRecords.length === 0">
              <td colspan="4" class="empty">No attendance records found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
    styles: [`
    .page-header { margin-bottom: 24px; }
    .page-header h1 { font-size: 26px; font-weight: 700; color: #1a1f36; margin: 0 0 4px 0; }
    .page-header p { color: #6b7280; font-size: 14px; margin: 0; }
    .card { background: #fff; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.04); }
    .form-card { padding: 24px; }
    .inline-form { display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-end; }
    .form-group { flex: 1; min-width: 150px; }
    .form-group label { display: block; font-size: 12px; font-weight: 600; color: #374151; margin-bottom: 6px; }
    .form-group input, .form-group select { width: 100%; padding: 10px 14px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 13px; box-sizing: border-box; }
    .form-group input:focus, .form-group select:focus { outline: none; border-color: #6366f1; }
    .form-actions-inline { flex: 0 0 auto; }
    .btn-primary { padding: 10px 20px; background: linear-gradient(135deg, #6366f1, #4f46e5); color: #fff; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; height: 42px; }
    .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(99,102,241,0.2); }
    .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }
    .mt-4 { margin-top: 24px; }
    .card-header { padding: 20px 24px; border-bottom: 1px solid #f3f4f6; }
    .card-header h3 { margin: 0; font-size: 16px; font-weight: 600; color: #1a1f36; }
    .table-card { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; }
    th { padding: 14px 24px; text-align: left; font-size: 12px; font-weight: 600; color: #6b7280; background: #fafafa; text-transform: uppercase; border-bottom: 1px solid #f3f4f6; }
    td { padding: 14px 24px; font-size: 13px; color: #374151; border-bottom: 1px solid #f3f4f6; }
    .text-sm { font-size: 11px; color: #9ca3af; }
    .status-badge { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; }
    .status-badge.present { background: #dcfce7; color: #166534; }
    .status-badge.absent { background: #fee2e2; color: #991b1b; }
    .status-badge.late { background: #fef9c3; color: #854d0e; }
    .empty { text-align: center; color: #9ca3af; padding: 40px !important; }
  `]
})
export class TeacherAttendanceComponent implements OnInit {
    students: Student[] = [];
    attendanceRecords: AttendanceRecord[] = [];
    teacherId: number | null = null;

    form: any = {
        studentId: '',
        date: new Date().toISOString().split('T')[0],
        subject: '',
        status: 'PRESENT'
    };

    constructor(private apiService: ApiService, private authService: AuthService) {
        this.teacherId = this.authService.getRefId();
    }

    ngOnInit() {
        this.loadStudents();
        this.loadAttendanceRecords();
    }

    loadStudents() {
        this.apiService.getTeacherStudents().subscribe(data => this.students = data);
    }

    loadAttendanceRecords() {
        if (this.teacherId) {
            this.apiService.getTeacherAttendance(this.teacherId).subscribe(data => {
                // Sort by date descending
                this.attendanceRecords = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            });
        }
    }

    onMarkAttendance() {
        if (!this.teacherId) return;

        const request: AttendanceRequest = {
            studentId: parseInt(this.form.studentId),
            teacherId: this.teacherId,
            date: this.form.date,
            subject: this.form.subject,
            status: this.form.status
        };

        this.apiService.markAttendance(request).subscribe({
            next: () => {
                this.loadAttendanceRecords();
                // Reset only form subject and status, keep date and student to easily add more
                // this.form.studentId = ''; 
                // this.form.subject = '';
                this.form.status = 'PRESENT';
                alert('Attendance marked successfully!');
            },
            error: (err) => {
                alert('Failed to mark attendance. ' + (err.error?.message || ''));
            }
        });
    }
}
