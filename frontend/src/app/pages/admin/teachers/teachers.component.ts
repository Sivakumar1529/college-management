import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Teacher, Department } from '../../../shared/models/models';

@Component({
    selector: 'app-teachers',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="page">
      <div class="page-header">
        <div>
          <h1>Teachers</h1>
          <p>Manage teacher records</p>
        </div>
        <button class="btn-primary" (click)="showForm = !showForm">
          {{ showForm ? '✕ Close' : '+ Add Teacher' }}
        </button>
      </div>

      <div class="card form-card" *ngIf="showForm">
        <h3>{{ editingId ? 'Edit Teacher' : 'Add New Teacher' }}</h3>
        <form (ngSubmit)="onSubmit()">
          <div class="form-grid">
            <div class="form-group">
              <label>Name *</label>
              <input type="text" [(ngModel)]="form.name" name="name" required placeholder="Enter full name">
            </div>
            <div class="form-group">
              <label>Email *</label>
              <input type="email" [(ngModel)]="form.email" name="email" required placeholder="Enter email">
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input type="text" [(ngModel)]="form.phone" name="phone" placeholder="Enter phone">
            </div>
            <div class="form-group">
              <label>Qualification</label>
              <input type="text" [(ngModel)]="form.qualification" name="qualification" placeholder="e.g. M.Tech, PhD">
            </div>
            <div class="form-group">
              <label>Specialization</label>
              <input type="text" [(ngModel)]="form.specialization" name="specialization" placeholder="e.g. Data Science">
            </div>
            <div class="form-group">
              <label>Department</label>
              <select [(ngModel)]="form.departmentId" name="departmentId">
                <option value="">Select Department</option>
                <option *ngFor="let d of departments" [value]="d.id">{{ d.name }}</option>
              </select>
            </div>
          </div>
          <div class="form-actions">
            <button type="button" class="btn-secondary" (click)="resetForm()">Cancel</button>
            <button type="submit" class="btn-primary">{{ editingId ? 'Update' : 'Save' }}</button>
          </div>
        </form>
      </div>

      <div class="search-bar">
        <input type="text" [(ngModel)]="searchQuery" (input)="onSearch()" placeholder="🔍 Search teachers by name...">
      </div>

      <div class="card table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Email</th><th>Phone</th>
              <th>Qualification</th><th>Department</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let t of teachers">
              <td><span class="badge">{{ t.id }}</span></td>
              <td class="name-cell">{{ t.name }}</td>
              <td>{{ t.email }}</td>
              <td>{{ t.phone || '-' }}</td>
              <td>{{ t.qualification || '-' }}</td>
              <td>{{ t.department?.name || '-' }}</td>
              <td class="action-cell">
                <button class="btn-icon edit" (click)="editTeacher(t)">✏️</button>
                <button class="btn-icon delete" (click)="deleteTeacher(t.id!)">🗑️</button>
              </td>
            </tr>
            <tr *ngIf="teachers.length === 0">
              <td colspan="7" class="empty">No teachers found</td>
            </tr>
          </tbody>
        </table>
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
    .form-card h3 { font-size: 16px; font-weight: 600; margin: 0 0 20px 0; color: #1a1f36; }
    .form-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px; }
    .form-group label { display: block; font-size: 12px; font-weight: 600; color: #374151; margin-bottom: 4px; }
    .form-group input, .form-group select { width: 100%; padding: 10px 14px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 13px; box-sizing: border-box; transition: border-color 0.2s; }
    .form-group input:focus, .form-group select:focus { outline: none; border-color: #6366f1; }
    .form-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px; }
    .search-bar { margin-bottom: 16px; }
    .search-bar input { width: 100%; padding: 12px 18px; border: 2px solid #e5e7eb; border-radius: 12px; font-size: 14px; box-sizing: border-box; }
    .search-bar input:focus { outline: none; border-color: #6366f1; }
    .table-card { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; }
    th { padding: 14px 18px; text-align: left; font-size: 12px; font-weight: 600; color: #6b7280; background: #f9fafb; text-transform: uppercase; letter-spacing: 0.5px; }
    td { padding: 14px 18px; font-size: 13px; color: #374151; border-top: 1px solid #f3f4f6; }
    tr:hover td { background: #fafbff; }
    .name-cell { font-weight: 600; color: #1a1f36; }
    .badge { background: #f0fdf4; color: #16a34a; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; }
    .action-cell { display: flex; gap: 6px; }
    .btn-icon { background: none; border: none; cursor: pointer; font-size: 16px; padding: 4px 8px; border-radius: 6px; transition: background 0.2s; }
    .btn-icon.edit:hover { background: #eef2ff; }
    .btn-icon.delete:hover { background: #fef2f2; }
    .empty { text-align: center; color: #9ca3af; padding: 40px !important; }
  `]
})
export class TeachersComponent implements OnInit {
    teachers: Teacher[] = [];
    departments: Department[] = [];
    showForm = false;
    editingId: number | null = null;
    searchQuery = '';
    form: any = { name: '', email: '', phone: '', qualification: '', specialization: '', departmentId: '' };

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.loadTeachers();
        this.apiService.getDepartments().subscribe(d => this.departments = d);
    }

    loadTeachers() { this.apiService.getTeachers().subscribe(data => this.teachers = data); }

    onSearch() {
        if (this.searchQuery.trim()) {
            this.apiService.searchTeachers(this.searchQuery).subscribe(data => this.teachers = data);
        } else { this.loadTeachers(); }
    }

    onSubmit() {
        const payload: any = {
            name: this.form.name, email: this.form.email, phone: this.form.phone,
            qualification: this.form.qualification, specialization: this.form.specialization,
            department: this.form.departmentId ? { id: parseInt(this.form.departmentId) } : null
        };
        if (this.editingId) {
            this.apiService.updateTeacher(this.editingId, payload).subscribe(() => { this.resetForm(); this.loadTeachers(); });
        } else {
            this.apiService.createTeacher(payload).subscribe(() => { this.resetForm(); this.loadTeachers(); });
        }
    }

    editTeacher(t: Teacher) {
        this.editingId = t.id!;
        this.form = {
            name: t.name, email: t.email, phone: t.phone || '', qualification: t.qualification || '',
            specialization: t.specialization || '', departmentId: t.department?.id || ''
        };
        this.showForm = true;
    }

    deleteTeacher(id: number) {
        if (confirm('Are you sure?')) { this.apiService.deleteTeacher(id).subscribe(() => this.loadTeachers()); }
    }

    resetForm() {
        this.editingId = null; this.showForm = false;
        this.form = { name: '', email: '', phone: '', qualification: '', specialization: '', departmentId: '' };
    }
}
