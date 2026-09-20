package com.college.management.controller;

import com.college.management.dto.AttendanceSummary;
import com.college.management.entity.*;
import com.college.management.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    private final StudentService studentService;
    private final AttendanceService attendanceService;
    private final MarksService marksService;

    public StudentController(StudentService studentService,
            AttendanceService attendanceService,
            MarksService marksService) {
        this.studentService = studentService;
        this.attendanceService = attendanceService;
        this.marksService = marksService;
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity<Student> getProfile(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getStudentById(id));
    }

    @GetMapping("/attendance/{studentId}")
    public ResponseEntity<List<Attendance>> getAttendance(@PathVariable Long studentId) {
        return ResponseEntity.ok(attendanceService.getAttendanceByStudent(studentId));
    }

    @GetMapping("/attendance/summary/{studentId}")
    public ResponseEntity<AttendanceSummary> getAttendanceSummary(@PathVariable Long studentId) {
        return ResponseEntity.ok(attendanceService.getAttendanceSummary(studentId));
    }

    @GetMapping("/marks/{studentId}")
    public ResponseEntity<List<Marks>> getMarks(@PathVariable Long studentId) {
        return ResponseEntity.ok(marksService.getMarksByStudent(studentId));
    }
}
