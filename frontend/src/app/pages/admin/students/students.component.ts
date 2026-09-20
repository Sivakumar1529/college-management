import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Student, Department } from '../../../shared/models/models';

@Component({
    selector: 'app-students',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="page">
      <div class="page-header">
        <div>
          <h1>Students</h1>
          <p>Manage student records</p>
        </div>
        <button class="btn-primary" (click)="showForm = !showForm">
          {{ showForm ? '✕ Close' : '+ Add Student' }}
        </button>
      </div>

      <!-- Add/Edit Form -->
      <div class="card form-card" *ngIf="showForm" @fadeIn>
        <h3>{{ editingId ? 'Edit Student' : 'Add New Student' }}</h3>
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
              <label>Enrollment No *</label>
              <input type="text" [(ngModel)]="form.enrollmentNo" name="enrollmentNo" required placeholder="e.g. MCA2024001">
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input type="text" [(ngModel)]="form.phone" name="phone" placeholder="Enter phone">
            </div>
            <div class="form-group">
              <label>Date of Birth</label>
              <input type="date" [(ngModel)]="form.dob" name="dob">
            </div>
            <div class="form-group">
              <label>Semester</label>
              <input type="text" [(ngModel)]="form.semester" name="semester" placeholder="e.g. 3rd">
            </div>
            <div class="form-group">
              <label>Department</label>
              <select [(ngModel)]="form.departmentId" name="departmentId">
                <option value="">Select Department</option>
                <option *ngFor="let d of departments" [value]="d.id">{{ d.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>Address</label>
              <input type="text" [(ngModel)]="form.address" name="address" placeholder="Enter address">
            </div>
          </div>
          <div class="form-actions">
            <button type="button" class="btn-secondary" (click)="resetForm()">Cancel</button>
            <button type="submit" class="btn-primary">{{ editingId ? 'Update' : 'Save' }}</button>
          </div>
        </form>
      </div>

      <!-- Search -->
      <div class="search-bar">
        <input type="text" [(ngModel)]="searchQuery" (input)="onSearch()" placeholder="🔍 Search students by name...">
      </div>

      <!-- Table -->
      <div class="card table-card">
        <table>
          <thead>
            <tr>
              <th>Enrollment No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Semester</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let s of students">
              <td><span class="badge">{{ s.enrollmentNo }}</span></td>
              <td class="name-cell">{{ s.name }}</td>
              <td>{{ s.email }}</td>
              <td>{{ s.phone || '-' }}</td>
              <td>{{ s.department?.name || '-' }}</td>
              <td>{{ s.semester || '-' }}</td>
              <td class="action-cell">
                <button class="btn-icon edit" (click)="editStudent(s)">✏️</button>
                <button class="btn-icon delete" (click)="deleteStudent(s.id!)">🗑️</button>
              </td>
            </tr>
            <tr *ngIf="students.length === 0">
              <td colspan="7" class="empty">No students found</td>
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
    .btn-primary {
      padding: 10px 20px; background: linear-gradient(135deg, #6366f1, #4f46e5);
      color: #fff; border: none; border-radius: 10px; font-size: 13px; font-weight: 600;
      cursor: pointer; transition: all 0.2s;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(99,102,241,0.3); }
    .btn-secondary {
      padding: 10px 20px; background: #f1f5f9; color: #374151; border: none;
      border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer;
    }
    .card { background: #fff; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.04); }
    .form-card { padding: 28px; margin-bottom: 20px; }
    .form-card h3 { font-size: 16px; font-weight: 600; margin: 0 0 20px 0; color: #1a1f36; }
    .form-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px; }
    .form-group label { display: block; font-size: 12px; font-weight: 600; color: #374151; margin-bottom: 4px; }
    .form-group input, .form-group select {
      width: 100%; padding: 10px 14px; border: 2px solid #e5e7eb; border-radius: 8px;
      font-size: 13px; box-sizing: border-box; transition: border-color 0.2s;
    }
    .form-group input:focus, .form-group select:focus { outline: none; border-color: #6366f1; }
    .form-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px; }
    .search-bar { margin-bottom: 16px; }
    .search-bar input {
      width: 100%; padding: 12px 18px; border: 2px solid #e5e7eb; border-radius: 12px;
      font-size: 14px; box-sizing: border-box; transition: all 0.2s;
    }
    .search-bar input:focus { outline: none; border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.08); }
    .table-card { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; }
    th { padding: 14px 18px; text-align: left; font-size: 12px; font-weight: 600; color: #6b7280; background: #f9fafb; text-transform: uppercase; letter-spacing: 0.5px; }
    td { padding: 14px 18px; font-size: 13px; color: #374151; border-top: 1px solid #f3f4f6; }
    tr:hover td { background: #fafbff; }
    .name-cell { font-weight: 600; color: #1a1f36; }
    .badge { background: #eef2ff; color: #4f46e5; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; }
    .action-cell { display: flex; gap: 6px; }
    .btn-icon { background: none; border: none; cursor: pointer; font-size: 16px; padding: 4px 8px; border-radius: 6px; transition: background 0.2s; }
    .btn-icon.edit:hover { background: #eef2ff; }
    .btn-icon.delete:hover { background: #fef2f2; }
    .empty { text-align: center; color: #9ca3af; padding: 40px !important; }
  `]
})
export class StudentsComponent implements OnInit {
    students: Student[] = [];
    departments: Department[] = [];
    showForm = false;
    editingId: number | null = null;
    searchQuery = '';
    form: any = { name: '', email: '', enrollmentNo: '', phone: '', dob: '', semester: '', address: '', departmentId: '' };

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.loadStudents();
        this.apiService.getDepartments().subscribe(d => this.departments = d);
    }

    loadStudents() {
        this.apiService.getStudents().subscribe(data => this.students = data);
    }

    onSearch() {
        if (this.searchQuery.trim()) {
            this.apiService.searchStudents(this.searchQuery).subscribe(data => this.students = data);
        } else {
            this.loadStudents();
        }
    }

    onSubmit() {
        const payload: any = {
            name: this.form.name, email: this.form.email, enrollmentNo: this.form.enrollmentNo,
            phone: this.form.phone, dob: this.form.dob || null, semester: this.form.semester, address: this.form.address,
            department: this.form.departmentId ? { id: parseInt(this.form.departmentId) } : null
        };

        if (this.editingId) {
            this.apiService.updateStudent(this.editingId, payload).subscribe(() => { this.resetForm(); this.loadStudents(); });
        } else {
            this.apiService.createStudent(payload).subscribe(() => { this.resetForm(); this.loadStudents(); });
        }
    }

    editStudent(s: Student) {
        this.editingId = s.id!;
        this.form = {
            name: s.name, email: s.email, enrollmentNo: s.enrollmentNo, phone: s.phone || '',
            dob: s.dob || '', semester: s.semester || '', address: s.address || '', departmentId: s.department?.id || ''
        };
        this.showForm = true;
    }

    deleteStudent(id: number) {
        if (confirm('Are you sure you want to delete this student?')) {
            this.apiService.deleteStudent(id).subscribe(() => this.loadStudents());
        }
    }

    resetForm() {
        this.editingId = null;
        this.showForm = false;
        this.form = { name: '', email: '', enrollmentNo: '', phone: '', dob: '', semester: '', address: '', departmentId: '' };
    }
}
