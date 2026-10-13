import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-page">
      <div class="login-left">
        <div class="brand-content">
          <!-- College Logo -->
          <img src="assets/hicas-logo.jpg" alt="HICAS Logo" class="brand-logo" onerror="this.style.display='none'" />
          
          <h1>Hindusthan College of Arts & Science</h1>
          <p class="college-tagline">HICAS • NAAC A++</p>
          
          <div class="about-section">
            <h3>About</h3>
            <p><strong>Address:</strong> Avinashi Rd, behind Nava India, Udayampalayam, Tamil Nadu 641028</p>
            <p><strong>Phone:</strong> +91 98431 33333</p>
            <p><strong>Mobile:</strong> +91 80983 33333</p>
            <p><strong>Email:</strong> info&#64;hindusthan.net</p>
          </div>

          <div class="features">
            <div class="feature"><span>✓</span> Student Management</div>
            <div class="feature"><span>✓</span> Attendance Tracking</div>
            <div class="feature"><span>✓</span> Marks Management</div>
            <div class="feature"><span>✓</span> Department Management</div>
          </div>
        </div>
      </div>
      <div class="login-right">
        <div class="login-card">
          <h2>Welcome Back</h2>
          <p class="subtitle">Sign in to your account</p>

          <div class="error-msg" *ngIf="error">{{ error }}</div>

          <form (ngSubmit)="onLogin()">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" id="username" [(ngModel)]="username" name="username"
                     placeholder="Enter username" required>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" [(ngModel)]="password" name="password"
                     placeholder="Enter password" required>
            </div>
            <button type="submit" class="login-btn" [disabled]="loading">
              {{ loading ? 'Signing in...' : 'Sign In' }}
            </button>
          </form>

          <div class="demo-creds">
            <p>Demo Credentials:</p>
            <span class="cred" (click)="fillCredentials('admin', 'admin123')">Admin: admin / admin123</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      display: flex;
      min-height: 100vh;
      font-family: 'Inter', 'Segoe UI', sans-serif;
    }
    .login-left {
      flex: 1;
      background: linear-gradient(135deg, #1a1f36 0%, #2d1b69 50%, #1a1f36 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 60px;
      position: relative;
      overflow: hidden;
    }
    .login-left::before {
      content: '';
      position: absolute;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
      top: 10%;
      right: -100px;
      border-radius: 50%;
    }
    .login-left::after {
      content: '';
      position: absolute;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(79, 70, 229, 0.2) 0%, transparent 70%);
      bottom: 10%;
      left: -50px;
      border-radius: 50%;
    }
    .brand-content { position: relative; z-index: 2; color: #fff; max-width: 480px; }
    .brand-logo {
      width: 120px;
      height: 120px;
      object-fit: contain;
      margin-bottom: 20px;
      display: block;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 18px;
      padding: 10px;
    }
    .brand-icon { font-size: 60px; margin-bottom: 20px; }
    .brand-content h1 {
      font-size: 34px;
      font-weight: 800;
      margin: 0 0 12px 0;
      line-height: 1.2;
    }
    .college-tagline {
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #dbeafe;
      font-size: 14px;
      margin: 0 0 24px;
    }
    .about-section h3 {
      margin: 0 0 12px;
      font-size: 22px;
    }
    .brand-content p {
      font-size: 16px;
      color: #dbeafe;
      line-height: 1.6;
      margin-bottom: 10px;
    }
    .features { display: flex; flex-direction: column; gap: 12px; }
    .feature {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 15px;
      color: #c7d2fe;
    }
    .feature span {
      width: 24px;
      height: 24px;
      background: rgba(99, 102, 241, 0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #a5b4fc;
    }
    .login-right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f8fafc;
      padding: 40px;
    }
    .login-card {
      width: 100%;
      max-width: 420px;
      background: #fff;
      padding: 48px;
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
    }
    .login-card h2 {
      font-size: 28px;
      font-weight: 700;
      color: #1a1f36;
      margin: 0 0 6px 0;
    }
    .subtitle { color: #6b7280; font-size: 14px; margin: 0 0 32px 0; }
    .error-msg {
      background: #fef2f2;
      color: #dc2626;
      padding: 12px 16px;
      border-radius: 10px;
      font-size: 13px;
      margin-bottom: 20px;
      border: 1px solid #fecaca;
    }
    .form-group { margin-bottom: 20px; }
    .form-group label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: #374151;
      margin-bottom: 6px;
    }
    .form-group input {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #e5e7eb;
      border-radius: 10px;
      font-size: 14px;
      color: #1a1f36;
      transition: all 0.2s;
      box-sizing: border-box;
    }
    .form-group input:focus {
      outline: none;
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }
    .login-btn {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #6366f1, #4f46e5);
      color: #fff;
      border: none;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      margin-top: 8px;
    }
    .login-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(99, 102, 241, 0.35);
    }
    .login-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
    .demo-creds {
      margin-top: 28px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      text-align: center;
    }
    .demo-creds p { font-size: 12px; color: #9ca3af; margin: 0 0 8px 0; }
    .cred {
      display: inline-block;
      font-size: 12px;
      color: #6366f1;
      background: #eef2ff;
      padding: 4px 10px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .cred:hover { background: #e0e7ff; }
    @media (max-width: 768px) {
      .login-page { flex-direction: column; }
      .login-left { padding: 40px 20px; min-height: 300px; }
      .brand-content h1 { font-size: 24px; }
      .login-right { padding: 20px; }
      .login-card { padding: 32px 24px; }
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isLoggedIn()) {
      this.redirectByRole();
    }
  }

  fillCredentials(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  onLogin() {
    this.loading = true;
    this.error = '';

    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => {
        this.loading = false;
        this.redirectByRole();
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Invalid credentials. Please try again.';
      }
    });
  }

  private redirectByRole() {
    const role = this.authService.getRole();
    switch (role) {
      case 'ADMIN': this.router.navigate(['/admin/dashboard']); break;
      case 'TEACHER': this.router.navigate(['/teacher/attendance']); break;
      case 'STUDENT': this.router.navigate(['/student/profile']); break;
      default: this.router.navigate(['/login']);
    }
  }
}
