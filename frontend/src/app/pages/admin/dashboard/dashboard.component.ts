import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { DashboardStats } from '../../../shared/models/models';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="dashboard">
      <div class="college-hero">
        <img src="assets/college-banner.jpg" alt="HICAS campus" />
        <div class="hero-overlay">
          <span class="eyebrow">HICAS</span>
          <h1>Hindusthan College of Arts & Science</h1>
          <p>Empowering learning, creativity, and excellence since 2000.</p>
        </div>
      </div>

      <div class="page-header">
        <h1>Dashboard</h1>
        <p>Overview of Hindusthan College of Arts & Science</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card students">
          <div class="stat-icon">👨‍🎓</div>
          <div class="stat-info">
            <span class="stat-value">{{ stats?.totalStudents || 0 }}</span>
            <span class="stat-label">Total Students</span>
          </div>
        </div>
        <div class="stat-card teachers">
          <div class="stat-icon">👨‍🏫</div>
          <div class="stat-info">
            <span class="stat-value">{{ stats?.totalTeachers || 0 }}</span>
            <span class="stat-label">Total Teachers</span>
          </div>
        </div>
        <div class="stat-card departments">
          <div class="stat-icon">🏛️</div>
          <div class="stat-info">
            <span class="stat-value">{{ stats?.totalDepartments || 0 }}</span>
            <span class="stat-label">Departments</span>
          </div>
        </div>
        <div class="stat-card attendance">
          <div class="stat-icon">📋</div>
          <div class="stat-info">
            <span class="stat-value">{{ stats?.totalAttendanceRecords || 0 }}</span>
            <span class="stat-label">Attendance Records</span>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="info-card">
          <h3>Quick Actions</h3>
          <div class="actions-grid">
            <a routerLink="/admin/students" class="action-btn"><span>➕</span> Add Student</a>
            <a routerLink="/admin/teachers" class="action-btn"><span>➕</span> Add Teacher</a>
            <a routerLink="/admin/departments" class="action-btn"><span>➕</span> Add Department</a>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .dashboard { padding: 10px 0; }
    .college-hero {
      position: relative;
      overflow: hidden;
      border-radius: 20px;
      margin-bottom: 28px;
      box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
      border: 1px solid rgba(148, 163, 184, 0.18);
      background: #fff;
    }
    .college-hero img {
      width: 100%;
      height: 280px;
      object-fit: cover;
      display: block;
      filter: saturate(1.1) contrast(1.04);
    }
    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.2));
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 32px 40px;
      color: #fff;
    }
    .eyebrow {
      display: inline-block;
      width: fit-content;
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 999px;
      padding: 8px 12px;
      font-size: 12px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    .hero-overlay h1 {
      margin: 0;
      font-size: 34px;
      line-height: 1.15;
      max-width: 620px;
    }
    .hero-overlay p {
      margin-top: 10px;
      font-size: 15px;
      color: rgba(255,255,255,0.9);
      max-width: 500px;
    }
    .page-header { margin-bottom: 32px; }
    .page-header h1 { font-size: 26px; font-weight: 700; color: #1a1f36; margin: 0 0 6px 0; }
    .page-header p { color: #6b7280; font-size: 14px; margin: 0; }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 20px;
      margin-bottom: 32px;
    }
    .stat-card {
      background: #fff;
      border-radius: 16px;
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
      transition: all 0.3s ease;
      border: 1px solid rgba(0, 0, 0, 0.04);
    }
    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    }
    .stat-icon {
      width: 56px;
      height: 56px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 26px;
    }
    .stat-card.students .stat-icon { background: #eef2ff; }
    .stat-card.teachers .stat-icon { background: #f0fdf4; }
    .stat-card.departments .stat-icon { background: #fefce8; }
    .stat-card.attendance .stat-icon { background: #fdf2f8; }
    .stat-info { display: flex; flex-direction: column; }
    .stat-value { font-size: 28px; font-weight: 800; color: #1a1f36; }
    .stat-label { font-size: 13px; color: #6b7280; font-weight: 500; }
    .info-card {
      background: #fff;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
      border: 1px solid rgba(0, 0, 0, 0.04);
    }
    .info-card h3 { font-size: 16px; font-weight: 600; color: #1a1f36; margin: 0 0 16px 0; }
    .actions-grid { display: flex; gap: 12px; flex-wrap: wrap; }
    .action-btn {
      padding: 10px 20px;
      background: #f1f5f9;
      border-radius: 10px;
      color: #4f46e5;
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .action-btn:hover { background: #eef2ff; transform: translateY(-1px); }
  `]
})
export class DashboardComponent implements OnInit {
    stats: DashboardStats | null = null;

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.apiService.getDashboardStats().subscribe(data => this.stats = data);
    }
}
