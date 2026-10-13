import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule],
    template: `
    <header class="navbar">
      <div class="navbar-left">
        <h2 class="page-title">HICAS</h2>
      </div>
      <div class="navbar-right">
        <div class="user-badge">
          <div class="avatar">{{ username.charAt(0).toUpperCase() }}</div>
          <div class="user-info">
            <span class="user-name">{{ username }}</span>
            <span class="user-role">{{ role }}</span>
          </div>
        </div>
      </div>
    </header>
  `,
    styles: [`
    .navbar {
      height: 64px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .page-title {
      font-size: 18px;
      font-weight: 600;
      color: #1a1f36;
      margin: 0;
    }
    .navbar-right { display: flex; align-items: center; gap: 16px; }
    .user-badge {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 14px 6px 6px;
      background: #f1f5f9;
      border-radius: 50px;
    }
    .avatar {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: linear-gradient(135deg, #6366f1, #4f46e5);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
    }
    .user-info { display: flex; flex-direction: column; }
    .user-name { font-size: 13px; font-weight: 600; color: #1a1f36; }
    .user-role { font-size: 11px; color: #6b7280; text-transform: capitalize; }
  `]
})
export class NavbarComponent {
    username = '';
    role = '';

    constructor(private authService: AuthService) {
        this.authService.currentUser$.subscribe(user => {
            this.username = user?.username || '';
            this.role = user?.role || '';
        });
    }
}
