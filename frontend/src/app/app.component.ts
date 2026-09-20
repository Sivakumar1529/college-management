import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, NavbarComponent],
  template: `
    <div class="app-layout" *ngIf="isLoggedIn$ | async as loggedIn; else loginLayout">
      <app-sidebar></app-sidebar>
      <div class="main-content" [class.shifted]="true">
        <app-navbar></app-navbar>
        <main class="content-wrapper">
          <router-outlet></router-outlet>
        </main>
        <footer class="app-footer">
          <div class="footer-top">
            <div class="footer-brand">
              <img src="assets/hicas-logo.jpg" alt="HICAS logo" />
              <div>
                <strong>Hindusthan College of Arts & Science</strong>
                <span>HICAS</span>
              </div>
            </div>
            <div class="footer-contact">
              <h4>Contact</h4>
              <p>Avinashi Rd, behind Nava India, Udayampalayam, Tamil Nadu 641028</p>
              <p>T : +91 98431 33333</p>
              <p>M : +91 80983 33333</p>
              <p>E : info&#64;hindusthan.net</p>
            </div>
          </div>
          <div class="footer-bottom">© Hindusthan Educational Institutions. All rights reserved.</div>
        </footer>
      </div>
    </div>
    <ng-template #loginLayout>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  styles: [`
    .app-layout {
      display: flex;
      min-height: 100vh;
      background-color: #f8fafc;
    }
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 250px;
      transition: margin-left 0.3s ease;
      min-height: 100vh;
      background: #f8fafc;
    }
    .content-wrapper {
      padding: 32px;
      flex: 1;
      max-width: 1400px;
      margin: 0 auto;
      width: 100%;
      box-sizing: border-box;
    }
    .app-footer {
      background: #111827;
      color: #e5e7eb;
      padding: 24px 32px 16px;
      margin-top: 20px;
    }
    .footer-top {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      gap: 24px;
      align-items: flex-start;
      flex-wrap: wrap;
    }
    .footer-brand {
      display: flex;
      align-items: center;
      gap: 16px;
      min-width: 260px;
    }
    .footer-brand img {
      width: 56px;
      height: 56px;
      object-fit: contain;
      border-radius: 12px;
      background: rgba(255,255,255,0.08);
      padding: 6px;
    }
    .footer-brand strong {
      display: block;
      font-size: 20px;
      color: #fff;
      line-height: 1.2;
    }
    .footer-brand span {
      font-size: 12px;
      letter-spacing: 1px;
      color: #cbd5e1;
      text-transform: uppercase;
    }
    .footer-contact {
      max-width: 520px;
      color: #d1d5db;
      font-size: 14px;
    }
    .footer-contact h4 {
      margin: 0 0 10px;
      color: #fff;
      font-size: 18px;
    }
    .footer-contact p {
      margin: 6px 0;
      line-height: 1.6;
    }
    .footer-bottom {
      max-width: 1400px;
      margin: 18px auto 0;
      padding-top: 18px;
      border-top: 1px solid rgba(255,255,255,0.1);
      text-align: center;
      color: #cbd5e1;
      font-size: 13px;
    }
    @media (max-width: 768px) {
      .main-content { margin-left: 70px; }
      .content-wrapper { padding: 20px 16px; }
      .app-footer { padding: 20px 16px 12px; }
    }
  `]
})
export class AppComponent {
  title = 'HICAS';
  isLoggedIn$;

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.currentUser$;
  }
}
