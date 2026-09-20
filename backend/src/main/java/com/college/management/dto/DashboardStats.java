package com.college.management.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStats {
    private long totalStudents;
    private long totalTeachers;
    private long totalDepartments;
    private long totalAttendanceRecords;
}
