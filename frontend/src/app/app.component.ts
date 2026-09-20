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
    /* If sidebar is collapsed, margin should adjust. Handled by passing state, but for simplicity, 
       we can assume a fixed left padding or use CSS variables from sidebar. 
       Here we handle basic layout */
    @media (max-width: 768px) {
      .main-content { margin-left: 70px; }
      .content-wrapper { padding: 20px 16px; }
    }
  `]
})
export class AppComponent {
  title = 'frontend';
  isLoggedIn$;

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.currentUser$;
  }
}
