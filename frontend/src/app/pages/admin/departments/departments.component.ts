import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Department } from '../../../shared/models/models';

@Component({
    selector: 'app-departments',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="page">
      <div class="page-header">
        <div><h1>Departments</h1><p>Manage department records</p></div>
        <button class="btn-primary" (click)="showForm = !showForm">{{ showForm ? '✕ Close' : '+ Add Department' }}</button>
      </div>

      <div class="card form-card" *ngIf="showForm">
        <h3>{{ editingId ? 'Edit Department' : 'Add New Department' }}</h3>
        <form (ngSubmit)="onSubmit()">
          <div class="form-grid">
            <div class="form-group">
              <label>Name *</label>
              <input type="text" [(ngModel)]="form.name" name="name" required placeholder="e.g. Computer Science">
            </div>
            <div class="form-group">
              <label>Code *</label>
              <input type="text" [(ngModel)]="form.code" name="code" required placeholder="e.g. CS">
            </div>
            <div class="form-group full-width">
              <label>Description</label>
              <input type="text" [(ngModel)]="form.description" name="description" placeholder="Short description">
            </div>
          </div>
          <div class="form-actions">
            <button type="button" class="btn-secondary" (click)="resetForm()">Cancel</button>
            <button type="submit" class="btn-primary">{{ editingId ? 'Update' : 'Save' }}</button>
          </div>
        </form>
      </div>

      <div class="departments-grid">
        <div class="dept-card" *ngFor="let d of departments">
          <div class="dept-icon">🏛️</div>
          <div class="dept-info">
            <h4>{{ d.name }}</h4>
            <span class="dept-code">{{ d.code }}</span>
            <p>{{ d.description || 'No description' }}</p>
          </div>
          <div class="dept-actions">
            <button class="btn-icon" (click)="editDept(d)">✏️</button>
            <button class="btn-icon" (click)="deleteDept(d.id!)">🗑️</button>
          </div>
        </div>
        <div class="empty-state" *ngIf="departments.length === 0">
          <p>No departments found. Add your first department!</p>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
    .page-header h1 { font-size: 26px; font-weight: 700; color: #1a1f36; margin: 0 0 4px 0; }
    .page-header p { color: #6b7280; font-size: 14px; margin: 0; }
    .btn-primary { padding: 10px 20px; background: linear-gradient(135deg, #6366f1, #4f46e5); color: #fff; border: none; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(99,102,241,0.3); }
    .btn-secondary { padding: 10px 20px; background: #f1f5f9; color: #374151; border: none; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer; }
    .card { background: #fff; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.04); }
    .form-card { padding: 28px; margin-bottom: 20px; }
    .form-card h3 { font-size: 16px; font-weight: 600; margin: 0 0 20px 0; }
    .form-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px; }
    .full-width { grid-column: 1 / -1; }
    .form-group label { display: block; font-size: 12px; font-weight: 600; color: #374151; margin-bottom: 4px; }
    .form-group input { width: 100%; padding: 10px 14px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 13px; box-sizing: border-box; }
    .form-group input:focus { outline: none; border-color: #6366f1; }
    .form-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px; }
    .departments-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
    .dept-card {
      background: #fff; border-radius: 16px; padding: 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.04);
      border: 1px solid rgba(0,0,0,0.04); display: flex; gap: 16px; align-items: flex-start;
      transition: all 0.3s;
    }
    .dept-card:hover { transform: translateY(-3px); box-shadow: 0 8px 30px rgba(0,0,0,0.08); }
    .dept-icon { font-size: 32px; width: 54px; height: 54px; background: #fefce8; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .dept-info { flex: 1; }
    .dept-info h4 { margin: 0 0 4px 0; font-size: 15px; font-weight: 600; color: #1a1f36; }
    .dept-code { background: #eef2ff; color: #4f46e5; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
    .dept-info p { margin: 8px 0 0 0; font-size: 12px; color: #6b7280; }
    .dept-actions { display: flex; gap: 4px; }
    .btn-icon { background: none; border: none; cursor: pointer; font-size: 14px; padding: 4px 6px; border-radius: 6px; transition: background 0.2s; }
    .btn-icon:hover { background: #f1f5f9; }
    .empty-state { grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #9ca3af; }
  `]
})
export class DepartmentsComponent implements OnInit {
    departments: Department[] = [];
    showForm = false;
    editingId: number | null = null;
    form = { name: '', code: '', description: '' };

    constructor(private apiService: ApiService) { }

    ngOnInit() { this.load(); }

    load() { this.apiService.getDepartments().subscribe(d => this.departments = d); }

    onSubmit() {
        const payload = { name: this.form.name, code: this.form.code, description: this.form.description };
        if (this.editingId) {
            this.apiService.updateDepartment(this.editingId, payload).subscribe(() => { this.resetForm(); this.load(); });
        } else {
            this.apiService.createDepartment(payload).subscribe(() => { this.resetForm(); this.load(); });
        }
    }

    editDept(d: Department) {
        this.editingId = d.id!;
        this.form = { name: d.name, code: d.code, description: d.description || '' };
        this.showForm = true;
    }

    deleteDept(id: number) {
        if (confirm('Are you sure?')) { this.apiService.deleteDepartment(id).subscribe(() => this.load()); }
    }

    resetForm() { this.editingId = null; this.showForm = false; this.form = { name: '', code: '', description: '' }; }
}
