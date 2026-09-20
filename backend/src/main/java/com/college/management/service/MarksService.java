package com.college.management.service;

import com.college.management.dto.MarksRequest;
import com.college.management.entity.*;
import com.college.management.exception.ResourceNotFoundException;
import com.college.management.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarksService {

    private final MarksRepository marksRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;

    public MarksService(MarksRepository marksRepository,
                        StudentRepository studentRepository,
                        TeacherRepository teacherRepository) {
        this.marksRepository = marksRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
    }

    public Marks addMarks(MarksRequest request) {
        Student student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        Teacher teacher = teacherRepository.findById(request.getTeacherId())
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found"));

        Marks marks = Marks.builder()
                .student(student)
                .teacher(teacher)
                .subject(request.getSubject())
                .marksObtained(request.getMarksObtained())
                .totalMarks(request.getTotalMarks())
                .examType(request.getExamType())
                .build();

        return marksRepository.save(marks);
    }

    public List<Marks> getMarksByStudent(Long studentId) {
        return marksRepository.findByStudentId(studentId);
    }

    public List<Marks> getMarksByTeacher(Long teacherId) {
        return marksRepository.findByTeacherId(teacherId);
    }

    public Marks updateMarks(Long id, MarksRequest request) {
        Marks marks = marksRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Marks record not found"));
        marks.setSubject(request.getSubject());
        marks.setMarksObtained(request.getMarksObtained());
        marks.setTotalMarks(request.getTotalMarks());
        marks.setExamType(request.getExamType());
        return marksRepository.save(marks);
    }

    public void deleteMarks(Long id) {
        marksRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Marks record not found"));
        marksRepository.deleteById(id);
    }
}
