import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

// Admin
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { StudentsComponent as AdminStudents } from './pages/admin/students/students.component';
import { TeachersComponent as AdminTeachers } from './pages/admin/teachers/teachers.component';
import { DepartmentsComponent } from './pages/admin/departments/departments.component';

// Teacher
import { TeacherAttendanceComponent } from './pages/teacher/attendance/attendance.component';
import { TeacherMarksComponent } from './pages/teacher/marks/marks.component';

// Student
import { StudentProfileComponent } from './pages/student/profile/profile.component';
import { StudentAttendanceComponent } from './pages/student/attendance/attendance.component';
import { StudentMarksComponent } from './pages/student/marks/marks.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },

    // Admin Routes
    { path: 'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
    { path: 'admin/students', component: AdminStudents, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
    { path: 'admin/teachers', component: AdminTeachers, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
    { path: 'admin/departments', component: DepartmentsComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },

    // Teacher Routes
    { path: 'teacher/attendance', component: TeacherAttendanceComponent, canActivate: [AuthGuard], data: { roles: ['TEACHER'] } },
    { path: 'teacher/marks', component: TeacherMarksComponent, canActivate: [AuthGuard], data: { roles: ['TEACHER'] } },

    // Student Routes
    { path: 'student/profile', component: StudentProfileComponent, canActivate: [AuthGuard], data: { roles: ['STUDENT'] } },
    { path: 'student/attendance', component: StudentAttendanceComponent, canActivate: [AuthGuard], data: { roles: ['STUDENT'] } },
    { path: 'student/marks', component: StudentMarksComponent, canActivate: [AuthGuard], data: { roles: ['STUDENT'] } },

    { path: '**', redirectTo: '/login' }
];
