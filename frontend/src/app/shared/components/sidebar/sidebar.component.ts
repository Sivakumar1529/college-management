import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <aside class="sidebar" [class.collapsed]="collapsed">
      <div class="sidebar-header">
        <div class="logo" *ngIf="!collapsed">
          <span class="logo-icon">🎓</span>
          <span class="logo-text">CMS</span>
        </div>
        <button class="toggle-btn" (click)="collapsed = !collapsed">
          {{ collapsed ? '▶' : '◀' }}
        </button>
      </div>

      <nav class="sidebar-nav">
        <!-- Admin Links -->
        <ng-container *ngIf="role === 'ADMIN'">
          <a routerLink="/admin/dashboard" routerLinkActive="active" class="nav-item">
            <span class="nav-icon">📊</span>
            <span class="nav-text" *ngIf="!collapsed">Dashboard</span>
          </a>
          <a routerLink="/admin/students" routerLinkActive="active" class="nav-item">
            <span class="nav-icon">👨‍🎓</span>
            <span class="nav-text" *ngIf="!collapsed">Students</span>
          </a>
          <a routerLink="/admin/teachers" routerLinkActive="active" class="nav-item">
            <span class="nav-icon">👨‍🏫</span>
            <span class="nav-text" *ngIf="!collapsed">Teachers</span>
          </a>
          <a routerLink="/admin/departments" routerLinkActive="active" class="nav-item">
            <span class="nav-icon">🏛️</span>
            <span class="nav-text" *ngIf="!collapsed">Departments</span>
          </a>
        </ng-container>

        <!-- Teacher Links -->
        <ng-container *ngIf="role === 'TEACHER'">
          <a routerLink="/teacher/attendance" routerLinkActive="active" class="nav-item">
            <span class="nav-icon">📋</span>
            <span class="nav-text" *ngIf="!collapsed">Attendance</span>
          </a>
          <a routerLink="/teacher/marks" routerLinkActive="active" class="nav-item">
            <span class="nav-icon">📝</span>
            <span class="nav-text" *ngIf="!collapsed">Marks</span>
          </a>
        </ng-container>

        <!-- Student Links -->
        <ng-container *ngIf="role === 'STUDENT'">
          <a routerLink="/student/profile" routerLinkActive="active" class="nav-item">
            <span class="nav-icon">👤</span>
            <span class="nav-text" *ngIf="!collapsed">Profile</span>
          </a>
          <a routerLink="/student/attendance" routerLinkActive="active" class="nav-item">
            <span class="nav-icon">📋</span>
            <span class="nav-text" *ngIf="!collapsed">Attendance</span>
          </a>
          <a routerLink="/student/marks" routerLinkActive="active" class="nav-item">
            <span class="nav-icon">📝</span>
            <span class="nav-text" *ngIf="!collapsed">Marks</span>
          </a>
        </ng-container>
      </nav>

      <div class="sidebar-footer">
        <button class="nav-item logout-btn" (click)="logout()">
          <span class="nav-icon">🚪</span>
          <span class="nav-text" *ngIf="!collapsed">Logout</span>
        </button>
      </div>
    </aside>
  `,
    styles: [`
    .sidebar {
      width: 250px;
      min-height: 100vh;
      background: linear-gradient(180deg, #1a1f36 0%, #0f1225 100%);
      display: flex;
      flex-direction: column;
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
      position: fixed;
      left: 0;
      top: 0;
      z-index: 100;
    }
    .sidebar.collapsed { width: 70px; }
    .sidebar-header {
      padding: 20px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .logo-icon { font-size: 28px; }
    .logo-text {
      font-size: 22px;
      font-weight: 700;
      color: #fff;
      letter-spacing: 2px;
    }
    .toggle-btn {
      background: rgba(255, 255, 255, 0.06);
      border: none;
      color: #8b92ab;
      cursor: pointer;
      padding: 6px 10px;
      border-radius: 8px;
      font-size: 12px;
      transition: all 0.2s;
    }
    .toggle-btn:hover { background: rgba(255, 255, 255, 0.12); color: #fff; }
    .sidebar-nav {
      flex: 1;
      padding: 16px 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      color: #8b92ab;
      text-decoration: none;
      border-radius: 10px;
      transition: all 0.2s ease;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
    }
    .nav-item:hover {
      background: rgba(99, 130, 255, 0.1);
      color: #fff;
      transform: translateX(4px);
    }
    .nav-item.active {
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: #fff;
      box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
    }
    .nav-icon { font-size: 18px; min-width: 24px; text-align: center; }
    .nav-text { white-space: nowrap; overflow: hidden; }
    .sidebar-footer {
      padding: 16px 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }
    .logout-btn:hover {
      background: rgba(239, 68, 68, 0.15) !important;
      color: #ef4444 !important;
    }
  `]
})
export class SidebarComponent {
    collapsed = false;
    role: string | null;

    constructor(private authService: AuthService) {
        this.role = this.authService.getRole();
    }

    logout() {
        this.authService.logout();
    }
}
