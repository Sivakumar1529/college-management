package com.college.management.repository;

import com.college.management.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByNameContainingIgnoreCase(String name);

    List<Student> findByDepartmentId(Long departmentId);

    Optional<Student> findByEnrollmentNo(String enrollmentNo);

    Optional<Student> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByEnrollmentNo(String enrollmentNo);
}
