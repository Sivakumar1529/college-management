import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { MarksRecord } from '../../../shared/models/models';

@Component({
    selector: 'app-student-marks',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="page">
      <div class="page-header">
        <h1>My Marks</h1>
        <p>View your academic performance and grades</p>
      </div>

      <div class="card table-card">
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Exam Type</th>
              <th>Marks Obtained</th>
              <th>Performance</th>
              <th>Teacher</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let m of marksRecords">
              <td class="subject-name">{{ m.subject }}</td>
              <td>
                <span class="exam-badge" [ngClass]="m.examType.toLowerCase()">{{ m.examType }}</span>
              </td>
              <td>
                <div class="score-display">
                  <span class="score-obtained">{{ m.marksObtained }}</span>
                  <span class="score-total">/ {{ m.totalMarks }}</span>
                </div>
              </td>
              <td>
                <div class="performance-indicator">
                  <div class="progress-bar-container">
                    <div class="progress-bar" [style.width.%]="getPercentage(m.marksObtained, m.totalMarks)" 
                         [ngClass]="getGradeClass(getPercentage(m.marksObtained, m.totalMarks))"></div>
                  </div>
                  <span class="percentage-text" [ngClass]="getGradeClass(getPercentage(m.marksObtained, m.totalMarks)) + '-text'">
                    {{ getPercentage(m.marksObtained, m.totalMarks) }}%
                  </span>
                </div>
              </td>
              <td class="teacher-name">{{ m.teacher.name }}</td>
            </tr>
            <tr *ngIf="marksRecords.length === 0">
              <td colspan="5" class="empty">No marks records available.</td>
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
    
    .card { background: #fff; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.04); }
    .table-card { overflow-x: auto; }
    
    table { width: 100%; border-collapse: collapse; }
    th { padding: 18px 24px; text-align: left; font-size: 12px; font-weight: 600; color: #6b7280; background: #fafafa; text-transform: uppercase; border-bottom: 1px solid #f3f4f6; }
    td { padding: 20px 24px; font-size: 14px; color: #374151; border-bottom: 1px solid #f3f4f6; vertical-align: middle; }
    
    .subject-name { font-weight: 600; color: #1a1f36; font-size: 15px; }
    .teacher-name { color: #6b7280; font-size: 13px; }
    
    .exam-badge { padding: 6px 12px; border-radius: 8px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; }
    .exam-badge.internal { background: #e0f2fe; color: #0284c7; border: 1px solid #bae6fd; }
    .exam-badge.external { background: #fce7f3; color: #be185d; border: 1px solid #fbcfe8; }
    .exam-badge.lab { background: #f3e8ff; color: #7e22ce; border: 1px solid #e9d5ff; }
    
    .score-display { display: flex; align-items: baseline; gap: 4px; }
    .score-obtained { font-size: 20px; font-weight: 700; color: #1a1f36; }
    .score-total { font-size: 13px; color: #9ca3af; font-weight: 500; }
    
    .performance-indicator { display: flex; align-items: center; gap: 12px; }
    .progress-bar-container { flex: 1; max-width: 120px; height: 8px; background-color: #f3f4f6; border-radius: 4px; overflow: hidden; }
    .progress-bar { height: 100%; border-radius: 4px; transition: width 0.5s ease; }
    
    .progress-bar.excellent { background-color: #10b981; }
    .progress-bar.good { background-color: #3b82f6; }
    .progress-bar.average { background-color: #f59e0b; }
    .progress-bar.poor { background-color: #ef4444; }
    
    .percentage-text { font-size: 14px; font-weight: 700; min-width: 45px; }
    .excellent-text { color: #10b981; }
    .good-text { color: #2563eb; }
    .average-text { color: #d97706; }
    .poor-text { color: #dc2626; }
    
    .empty { text-align: center; color: #9ca3af; padding: 60px 40px !important; font-size: 15px; }
  `]
})
export class StudentMarksComponent implements OnInit {
    studentId: number | null = null;
    marksRecords: MarksRecord[] = [];

    constructor(private apiService: ApiService, private authService: AuthService) {
        this.studentId = this.authService.getRefId();
    }

    ngOnInit() {
        if (this.studentId) {
            this.apiService.getStudentMarks(this.studentId).subscribe(data => this.marksRecords = data);
        }
    }

    getPercentage(obtained: number, total: number): string {
        if (total === 0) return '0.0';
        return ((obtained / total) * 100).toFixed(1);
    }

    getGradeClass(percentageStr: string): string {
        const p = parseFloat(percentageStr);
        if (p >= 80) return 'excellent';
        if (p >= 60) return 'good';
        if (p >= 40) return 'average';
        return 'poor';
    }
}
