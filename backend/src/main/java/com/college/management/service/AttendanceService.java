package com.college.management.service;

import com.college.management.dto.AttendanceRequest;
import com.college.management.dto.AttendanceSummary;
import com.college.management.entity.*;
import com.college.management.enums.AttendanceStatus;
import com.college.management.exception.ResourceNotFoundException;
import com.college.management.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;

    public AttendanceService(AttendanceRepository attendanceRepository,
            StudentRepository studentRepository,
            TeacherRepository teacherRepository) {
        this.attendanceRepository = attendanceRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
    }

    public Attendance markAttendance(AttendanceRequest request) {
        Student student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        Teacher teacher = teacherRepository.findById(request.getTeacherId())
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found"));

        Attendance attendance = Attendance.builder()
                .student(student)
                .teacher(teacher)
                .date(request.getDate())
                .status(request.getStatus())
                .subject(request.getSubject())
                .build();

        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getAttendanceByStudent(Long studentId) {
        return attendanceRepository.findByStudentId(studentId);
    }

    public List<Attendance> getAttendanceByTeacher(Long teacherId) {
        return attendanceRepository.findByTeacherId(teacherId);
    }

    public AttendanceSummary getAttendanceSummary(Long studentId) {
        long total = attendanceRepository.countByStudentId(studentId);
        long present = attendanceRepository.countByStudentIdAndStatus(studentId, AttendanceStatus.PRESENT);
        long absent = attendanceRepository.countByStudentIdAndStatus(studentId, AttendanceStatus.ABSENT);
        long late = attendanceRepository.countByStudentIdAndStatus(studentId, AttendanceStatus.LATE);
        double percentage = total > 0 ? ((double) (present + late) / total) * 100.0 : 0.0;

        return AttendanceSummary.builder()
                .totalClasses(total)
                .presentCount(present)
                .absentCount(absent)
                .lateCount(late)
                .attendancePercentage(Math.round(percentage * 100.0) / 100.0)
                .build();
    }

    public Attendance updateAttendance(Long id, AttendanceRequest request) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance record not found"));
        attendance.setStatus(request.getStatus());
        attendance.setDate(request.getDate());
        attendance.setSubject(request.getSubject());
        return attendanceRepository.save(attendance);
    }
}
