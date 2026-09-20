import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { Student, MarksRecord, MarksRequest } from '../../../shared/models/models';

@Component({
    selector: 'app-teacher-marks',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="page">
      <div class="page-header">
        <div>
          <h1>Enter Marks</h1>
          <p>Record student marks for internal or external exams</p>
        </div>
      </div>

      <div class="card form-card">
        <form (ngSubmit)="onAddMarks()">
          <div class="form-grid">
            <div class="form-group">
              <label>Student</label>
              <select [(ngModel)]="form.studentId" name="studentId" required>
                <option value="">Select Student</option>
                <option *ngFor="let s of students" [value]="s.id">{{ s.name }} ({{ s.enrollmentNo }})</option>
              </select>
            </div>
            <div class="form-group">
              <label>Subject</label>
              <input type="text" [(ngModel)]="form.subject" name="subject" required placeholder="e.g. Data Structures">
            </div>
            <div class="form-group">
              <label>Exam Type</label>
              <select [(ngModel)]="form.examType" name="examType" required>
                <option value="INTERNAL">Internal</option>
                <option value="EXTERNAL">External</option>
                <option value="LAB">Lab</option>
              </select>
            </div>
            <div class="form-group">
              <label>Marks Obtained</label>
              <input type="number" [(ngModel)]="form.marksObtained" name="marksObtained" required min="0">
            </div>
            <div class="form-group">
              <label>Total Marks</label>
              <input type="number" [(ngModel)]="form.totalMarks" name="totalMarks" required min="1">
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-primary" [disabled]="!form.studentId || !form.subject || form.marksObtained === null || form.totalMarks === null">Save Marks</button>
          </div>
        </form>
      </div>

      <div class="card table-card mt-4">
        <div class="card-header">
          <h3>Recent Marks Entered</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Subject</th>
              <th>Exam Type</th>
              <th>Marks</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let m of marksRecords">
              <td class="name-cell">{{ m.student.name }} <span class="text-sm">({{ m.student.enrollmentNo }})</span></td>
              <td>{{ m.subject }}</td>
              <td>
                <span class="exam-badge" [ngClass]="m.examType.toLowerCase()">{{ m.examType }}</span>
              </td>
              <td class="font-bold">{{ m.marksObtained }} / {{ m.totalMarks }}</td>
              <td>
                <div class="progress-bar-container">
                  <div class="progress-bar" [style.width.%]="getPercentage(m.marksObtained, m.totalMarks)" 
                       [ngClass]="getGradeClass(getPercentage(m.marksObtained, m.totalMarks))"></div>
                </div>
                <span class="percentage-text">{{ getPercentage(m.marksObtained, m.totalMarks) }}%</span>
              </td>
            </tr>
            <tr *ngIf="marksRecords.length === 0">
              <td colspan="5" class="empty">No marks records found</td>
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
    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
    .form-group label { display: block; font-size: 12px; font-weight: 600; color: #374151; margin-bottom: 6px; }
    .form-group input, .form-group select { width: 100%; padding: 10px 14px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 13px; box-sizing: border-box; }
    .form-group input:focus, .form-group select:focus { outline: none; border-color: #6366f1; }
    .form-actions { display: flex; justify-content: flex-end; margin-top: 20px; }
    .btn-primary { padding: 10px 24px; background: linear-gradient(135deg, #6366f1, #4f46e5); color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
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
    .font-bold { font-weight: 700; color: #1a1f36; }
    .exam-badge { padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; }
    .exam-badge.internal { background: #e0f2fe; color: #0284c7; border: 1px solid #bae6fd; }
    .exam-badge.external { background: #fce7f3; color: #be185d; border: 1px solid #fbcfe8; }
    .exam-badge.lab { background: #f3e8ff; color: #7e22ce; border: 1px solid #e9d5ff; }
    .progress-bar-container { height: 6px; background-color: #f3f4f6; border-radius: 4px; overflow: hidden; margin-bottom: 4px; width: 100px; display: inline-block; vertical-align: middle; margin-right: 8px; }
    .progress-bar { height: 100%; border-radius: 4px; transition: width 0.5s ease; }
    .progress-bar.excellent { background-color: #10b981; }
    .progress-bar.good { background-color: #3b82f6; }
    .progress-bar.average { background-color: #f59e0b; }
    .progress-bar.poor { background-color: #ef4444; }
    .percentage-text { font-size: 12px; font-weight: 600; }
    .empty { text-align: center; color: #9ca3af; padding: 40px !important; }
  `]
})
export class TeacherMarksComponent implements OnInit {
    students: Student[] = [];
    marksRecords: MarksRecord[] = [];
    teacherId: number | null = null;

    form: any = {
        studentId: '',
        subject: '',
        examType: 'INTERNAL',
        marksObtained: null,
        totalMarks: 100
    };

    constructor(private apiService: ApiService, private authService: AuthService) {
        this.teacherId = this.authService.getRefId();
    }

    ngOnInit() {
        this.loadStudents();
        this.loadMarksRecords();
    }

    loadStudents() {
        this.apiService.getTeacherStudents().subscribe(data => this.students = data);
    }

    loadMarksRecords() {
        if (this.teacherId) {
            this.apiService.getTeacherMarks(this.teacherId).subscribe(data => {
                this.marksRecords = data.reverse(); // Show newest first roughly
            });
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

    onAddMarks() {
        if (!this.teacherId) return;

        if (this.form.marksObtained > this.form.totalMarks) {
            alert('Marks obtained cannot be greater than total marks.');
            return;
        }

        const request: MarksRequest = {
            studentId: parseInt(this.form.studentId),
            teacherId: this.teacherId,
            subject: this.form.subject,
            examType: this.form.examType,
            marksObtained: this.form.marksObtained,
            totalMarks: this.form.totalMarks
        };

        this.apiService.addMarks(request).subscribe({
            next: () => {
                this.loadMarksRecords();
                this.form.marksObtained = null;
                alert('Marks added successfully!');
            },
            error: (err) => {
                alert('Failed to add marks. ' + (err.error?.message || ''));
            }
        });
    }
}
