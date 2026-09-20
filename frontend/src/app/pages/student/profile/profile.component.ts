import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { Student } from '../../../shared/models/models';

@Component({
    selector: 'app-student-profile',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="page" *ngIf="student">
      <div class="page-hero">
        <img src="assets/college-banner.jpg" alt="HICAS campus" />
        <div class="hero-copy">
          <span>HICAS</span>
          <h1>Student Profile</h1>
        </div>
      </div>

      <div class="page-header">
        <h1>My Profile</h1>
        <p>View your personal and academic details</p>
      </div>

      <div class="profile-layout">
        <!-- Main Info Card -->
        <div class="card profile-card">
          <div class="profile-header">
            <div class="avatar-large">{{ student.name.charAt(0) }}</div>
            <div class="title-info">
              <h2>{{ student.name }}</h2>
              <span class="badge">{{ student.enrollmentNo }}</span>
            </div>
          </div>
          
          <div class="info-grid">
            <div class="info-item">
              <span class="icon">📧</span>
              <div class="info-content">
                <span class="label">Email Address</span>
                <span class="value">{{ student.email }}</span>
              </div>
            </div>
            
            <div class="info-item">
              <span class="icon">📱</span>
              <div class="info-content">
                <span class="label">Phone Number</span>
                <span class="value">{{ student.phone || 'N/A' }}</span>
              </div>
            </div>
            
            <div class="info-item">
              <span class="icon">🎂</span>
              <div class="info-content">
                <span class="label">Date of Birth</span>
                <span class="value">{{ student.dob || 'N/A' }}</span>
              </div>
            </div>
            
            <div class="info-item">
              <span class="icon">📍</span>
              <div class="info-content">
                <span class="label">Address</span>
                <span class="value">{{ student.address || 'N/A' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Academic Info Card -->
        <div class="card academic-card">
          <div class="card-header">
            <h3>Academic Information</h3>
          </div>
          <div class="academic-details">
            <div class="detail-box">
              <span class="label">Department</span>
              <span class="value highlight">{{ student.department?.name || 'Unassigned' }}</span>
              <span class="sub" *ngIf="student.department">Code: {{ student.department.code }}</span>
            </div>
            <div class="detail-box">
              <span class="label">Current Semester</span>
              <span class="value">{{ student.semester || 'N/A' }}</span>
            </div>
            <div class="detail-box">
              <span class="label">Status</span>
              <span class="value success-text">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .page {
      background: #fff;
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
      border: 1px solid rgba(148, 163, 184, 0.12);
    }
    .page-hero {
      position: relative;
      overflow: hidden;
      border-radius: 16px;
      margin-bottom: 22px;
      border: 1px solid rgba(148, 163, 184, 0.18);
    }
    .page-hero img {
      display: block;
      width: 100%;
      height: 170px;
      object-fit: cover;
    }
    .hero-copy {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      padding: 20px 28px;
      background: linear-gradient(90deg, rgba(15, 23, 42, 0.78), rgba(15, 23, 42, 0.22));
      color: #fff;
    }
    .hero-copy span {
      position: absolute;
      top: 20px;
      left: 28px;
      font-size: 12px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      opacity: 0.9;
    }
    .hero-copy h1 {
      margin: 0;
      font-size: 28px;
      line-height: 1.2;
    }
    .page-header { margin-bottom: 32px; }
    .page-header h1 { font-size: 26px; font-weight: 700; color: #1a1f36; margin: 0 0 6px 0; }
    .page-header p { color: #6b7280; font-size: 14px; margin: 0; }
    
    .profile-layout {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 24px;
    }
    
    @media (max-width: 900px) {
      .profile-layout { grid-template-columns: 1fr; }
    }
    
    .card { background: #fff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.03); overflow: hidden; }
    
    /* Profile Card */
    .profile-card { padding: 32px; }
    .profile-header {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-bottom: 32px;
      padding-bottom: 32px;
      border-bottom: 1px solid #f3f4f6;
    }
    .avatar-large {
      width: 90px; height: 90px;
      border-radius: 50%;
      background: linear-gradient(135deg, #6366f1, #4f46e5);
      color: #fff; display: flex; align-items: center; justify-content: center;
      font-size: 36px; font-weight: 700;
      box-shadow: 0 8px 16px rgba(99, 102, 241, 0.2);
    }
    .title-info h2 { margin: 0 0 8px 0; font-size: 28px; font-weight: 700; color: #1a1f36; }
    .badge { background: #eef2ff; color: #4f46e5; padding: 6px 12px; border-radius: 8px; font-size: 13px; font-weight: 600; letter-spacing: 1px; }
    
    .info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
    .info-item { display: flex; align-items: flex-start; gap: 16px; }
    .info-item .icon { font-size: 20px; width: 40px; height: 40px; background: #f8fafc; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
    .info-content { display: flex; flex-direction: column; gap: 4px; }
    .info-content .label { font-size: 12px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
    .info-content .value { font-size: 15px; color: #1a1f36; font-weight: 500; }
    
    /* Academic Card */
    .card-header { padding: 24px 24px 16px; border-bottom: 1px solid #f3f4f6; }
    .card-header h3 { margin: 0; font-size: 18px; font-weight: 600; color: #1a1f36; }
    .academic-details { padding: 24px; display: flex; flex-direction: column; gap: 20px; }
    .detail-box {
      padding: 16px; background: #f8fafc; border-radius: 12px;
      display: flex; flex-direction: column; gap: 6px;
    }
    .detail-box .label { font-size: 12px; color: #6b7280; font-weight: 600; }
    .detail-box .value { font-size: 16px; font-weight: 700; color: #1a1f36; }
    .detail-box .value.highlight { color: #4f46e5; }
    .detail-box .value.success-text { color: #10b981; }
    .detail-box .sub { font-size: 12px; color: #9ca3af; }
  `]
})
export class StudentProfileComponent implements OnInit {
    student: Student | null = null;
    studentId: number | null = null;

    constructor(private apiService: ApiService, private authService: AuthService) {
        this.studentId = this.authService.getRefId();
    }

    ngOnInit() {
        if (this.studentId) {
            this.apiService.getStudentProfile(this.studentId).subscribe(data => this.student = data);
        }
    }
}
