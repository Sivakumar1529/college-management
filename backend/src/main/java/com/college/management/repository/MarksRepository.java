package com.college.management.repository;

import com.college.management.entity.Marks;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MarksRepository extends JpaRepository<Marks, Long> {
    List<Marks> findByStudentId(Long studentId);

    List<Marks> findByTeacherId(Long teacherId);

    List<Marks> findByStudentIdAndSubject(Long studentId, String subject);
}
