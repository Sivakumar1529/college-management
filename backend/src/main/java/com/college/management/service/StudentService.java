package com.college.management.service;

import com.college.management.entity.*;
import com.college.management.enums.Role;
import com.college.management.exception.*;
import com.college.management.repository.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final DepartmentRepository departmentRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public StudentService(StudentRepository studentRepository,
            DepartmentRepository departmentRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.studentRepository = studentRepository;
        this.departmentRepository = departmentRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }

    @Transactional
    public Student createStudent(Student student) {
        if (studentRepository.existsByEmail(student.getEmail())) {
            throw new DuplicateResourceException("Student already exists with email: " + student.getEmail());
        }
        if (studentRepository.existsByEnrollmentNo(student.getEnrollmentNo())) {
            throw new DuplicateResourceException(
                    "Student already exists with enrollment no: " + student.getEnrollmentNo());
        }

        if (student.getDepartment() != null && student.getDepartment().getId() != null) {
            Department dept = departmentRepository.findById(student.getDepartment().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Department not found"));
            student.setDepartment(dept);
        }

        Student saved = studentRepository.save(student);

        // Create login credentials: username = enrollment number, password = enrollment
        // number
        User user = User.builder()
                .username(saved.getEnrollmentNo().toLowerCase())
                .password(passwordEncoder.encode(saved.getEnrollmentNo().toLowerCase()))
                .role(Role.STUDENT)
                .refId(saved.getId())
                .build();
        userRepository.save(user);

        return saved;
    }

    @Transactional
    public Student updateStudent(Long id, Student updated) {
        Student student = getStudentById(id);
        student.setName(updated.getName());
        student.setEmail(updated.getEmail());
        student.setPhone(updated.getPhone());
        student.setDob(updated.getDob());
        student.setAddress(updated.getAddress());
        student.setSemester(updated.getSemester());

        if (updated.getDepartment() != null && updated.getDepartment().getId() != null) {
            Department dept = departmentRepository.findById(updated.getDepartment().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Department not found"));
            student.setDepartment(dept);
        }

        return studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        getStudentById(id);
        studentRepository.deleteById(id);
    }

    public List<Student> searchStudents(String query) {
        return studentRepository.findByNameContainingIgnoreCase(query);
    }

    public List<Student> getStudentsByDepartment(Long departmentId) {
        return studentRepository.findByDepartmentId(departmentId);
    }
}
