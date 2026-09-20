package com.college.management.controller;

import com.college.management.dto.AttendanceRequest;
import com.college.management.dto.MarksRequest;
import com.college.management.entity.*;
import com.college.management.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {

    private final AttendanceService attendanceService;
    private final MarksService marksService;
    private final StudentService studentService;

    public TeacherController(AttendanceService attendanceService,
            MarksService marksService,
            StudentService studentService) {
        this.attendanceService = attendanceService;
        this.marksService = marksService;
        this.studentService = studentService;
    }

    @GetMapping("/students")
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    // ── Attendance ─────────────────────────────────────────────
    @PostMapping("/attendance")
    public ResponseEntity<Attendance> markAttendance(@RequestBody AttendanceRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(attendanceService.markAttendance(request));
    }

    @PutMapping("/attendance/{id}")
    public ResponseEntity<Attendance> updateAttendance(@PathVariable Long id, @RequestBody AttendanceRequest request) {
        return ResponseEntity.ok(attendanceService.updateAttendance(id, request));
    }

    @GetMapping("/attendance/student/{studentId}")
    public ResponseEntity<List<Attendance>> getStudentAttendance(@PathVariable Long studentId) {
        return ResponseEntity.ok(attendanceService.getAttendanceByStudent(studentId));
    }

    @GetMapping("/attendance/teacher/{teacherId}")
    public ResponseEntity<List<Attendance>> getTeacherAttendance(@PathVariable Long teacherId) {
        return ResponseEntity.ok(attendanceService.getAttendanceByTeacher(teacherId));
    }

    // ── Marks ──────────────────────────────────────────────────
    @PostMapping("/marks")
    public ResponseEntity<Marks> addMarks(@RequestBody MarksRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(marksService.addMarks(request));
    }

    @PutMapping("/marks/{id}")
    public ResponseEntity<Marks> updateMarks(@PathVariable Long id, @RequestBody MarksRequest request) {
        return ResponseEntity.ok(marksService.updateMarks(id, request));
    }

    @GetMapping("/marks/student/{studentId}")
    public ResponseEntity<List<Marks>> getStudentMarks(@PathVariable Long studentId) {
        return ResponseEntity.ok(marksService.getMarksByStudent(studentId));
    }

    @GetMapping("/marks/teacher/{teacherId}")
    public ResponseEntity<List<Marks>> getTeacherMarks(@PathVariable Long teacherId) {
        return ResponseEntity.ok(marksService.getMarksByTeacher(teacherId));
    }
}
