package com.college.management.repository;

import com.college.management.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByStudentId(Long studentId);

    List<Attendance> findByTeacherId(Long teacherId);

    List<Attendance> findByStudentIdAndSubject(Long studentId, String subject);

    List<Attendance> findByDateAndSubjectAndTeacherId(LocalDate date, String subject, Long teacherId);

    long countByStudentId(Long studentId);

    long countByStudentIdAndStatus(Long studentId, com.college.management.enums.AttendanceStatus status);
}
