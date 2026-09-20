import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { AttendanceRecord, AttendanceSummary } from '../../../shared/models/models';

@Component({
    selector: 'app-student-attendance',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="page">
      <div class="page-header">
        <h1>My Attendance</h1>
        <p>View your attendance history and statistics</p>
      </div>

      <!-- Summary Cards -->
      <div class="stats-grid" *ngIf="summary">
        <div class="stat-card" [ngClass]="getPercentageClass(summary.attendancePercentage)">
          <div class="stat-title">Overall Attendance</div>
          <div class="stat-value percentage">
            {{ summary.attendancePercentage }}%
          </div>
          <div class="stat-sub">of {{ summary.totalClasses }} total classes</div>
        </div>
        
        <div class="stat-card present">
          <div class="stat-icon">✅</div>
          <div class="stat-details">
            <div class="stat-title">Present</div>
            <div class="stat-value">{{ summary.presentCount }}</div>
          </div>
        </div>
        
        <div class="stat-card absent">
          <div class="stat-icon">❌</div>
          <div class="stat-details">
            <div class="stat-title">Absent</div>
            <div class="stat-value">{{ summary.absentCount }}</div>
          </div>
        </div>
        
        <div class="stat-card late">
          <div class="stat-icon">⏱️</div>
          <div class="stat-details">
            <div class="stat-title">Late</div>
            <div class="stat-value">{{ summary.lateCount }}</div>
          </div>
        </div>
      </div>

      <!-- Detailed Records -->
      <div class="card table-card mt-4">
        <div class="card-header">
          <h3>Attendance History</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Subject</th>
              <th>Teacher</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let a of attendanceRecords">
              <td class="font-medium">{{ a.date | date:'mediumDate' }}</td>
              <td class="font-bold">{{ a.subject }}</td>
              <td>{{ a.teacher.name }}</td>
              <td>
                <span class="status-badge" [ngClass]="a.status.toLowerCase()">{{ a.status }}</span>
              </td>
            </tr>
            <tr *ngIf="attendanceRecords.length === 0">
              <td colspan="4" class="empty">No attendance records available.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
    styles: [`
    .page-header { margin-bottom: 24px; }
    .page-header h1 { font-size: 26px; font-weight: 700; color: #1a1f36; margin: 0 0 6px 0; }
    .page-header p { color: #6b7280; font-size: 14px; margin: 0; }
    
    .stats-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 20px; margin-bottom: 32px; }
    @media (max-width: 900px) {
      .stats-grid { grid-template-columns: 1fr 1fr; }
    }
    
    .stat-card {
      background: #fff; border-radius: 16px; padding: 24px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.04);
      display: flex; align-items: center; gap: 16px;
    }
    .stat-card.good-attendance { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; }
    .stat-card.warn-attendance { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; }
    .stat-card.bad-attendance { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; }
    
    .stat-card[class*="-attendance"] { flex-direction: column; align-items: flex-start; gap: 4px; justify-content: center; }
    .stat-card[class*="-attendance"] .stat-title,
    .stat-card[class*="-attendance"] .stat-sub { color: rgba(255,255,255,0.9); }
    
    .stat-icon { font-size: 28px; width: 56px; height: 56px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
    .stat-card.present .stat-icon { background: #dcfce7; }
    .stat-card.absent .stat-icon { background: #fee2e2; }
    .stat-card.late .stat-icon { background: #fef9c3; }
    
    .stat-details { display: flex; flex-direction: column; }
    .stat-title { font-size: 13px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; }
    .stat-value { font-size: 28px; font-weight: 800; color: #1a1f36; line-height: 1.2; }
    .stat-value.percentage { font-size: 36px; color: #fff; }
    .stat-sub { font-size: 13px; }
    
    .card { background: #fff; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.04); }
    .card-header { padding: 20px 24px; border-bottom: 1px solid #f3f4f6; }
    .card-header h3 { margin: 0; font-size: 16px; font-weight: 600; color: #1a1f36; }
    
    .table-card { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; }
    th { padding: 16px 24px; text-align: left; font-size: 12px; font-weight: 600; color: #6b7280; background: #fafafa; text-transform: uppercase; border-bottom: 1px solid #f3f4f6; }
    td { padding: 16px 24px; font-size: 14px; color: #374151; border-bottom: 1px solid #f3f4f6; }
    
    .font-medium { font-weight: 500; }
    .font-bold { font-weight: 600; color: #1a1f36; }
    
    .status-badge { padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; letter-spacing: 0.5px; }
    .status-badge.present { background: #dcfce7; color: #166534; }
    .status-badge.absent { background: #fee2e2; color: #991b1b; }
    .status-badge.late { background: #fef9c3; color: #854d0e; }
    
    .empty { text-align: center; color: #9ca3af; padding: 40px !important; }
  `]
})
export class StudentAttendanceComponent implements OnInit {
    studentId: number | null = null;
    attendanceRecords: AttendanceRecord[] = [];
    summary: AttendanceSummary | null = null;

    constructor(private apiService: ApiService, private authService: AuthService) {
        this.studentId = this.authService.getRefId();
    }

    ngOnInit() {
        if (this.studentId) {
            this.apiService.getStudentAttendanceSummary(this.studentId).subscribe(data => this.summary = data);
            this.apiService.getStudentAttendance(this.studentId).subscribe(data => {
                this.attendanceRecords = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            });
        }
    }

    getPercentageClass(percentage: number): string {
        if (percentage >= 75) return 'good-attendance';
        if (percentage >= 60) return 'warn-attendance';
        return 'bad-attendance';
    }
}
