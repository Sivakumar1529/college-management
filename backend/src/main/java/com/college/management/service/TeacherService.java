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
public class TeacherService {

    private final TeacherRepository teacherRepository;
    private final DepartmentRepository departmentRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public TeacherService(TeacherRepository teacherRepository,
            DepartmentRepository departmentRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.teacherRepository = teacherRepository;
        this.departmentRepository = departmentRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    public Teacher getTeacherById(Long id) {
        return teacherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + id));
    }

    @Transactional
    public Teacher createTeacher(Teacher teacher) {
        if (teacherRepository.existsByEmail(teacher.getEmail())) {
            throw new DuplicateResourceException("Teacher already exists with email: " + teacher.getEmail());
        }

        if (teacher.getDepartment() != null && teacher.getDepartment().getId() != null) {
            Department dept = departmentRepository.findById(teacher.getDepartment().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Department not found"));
            teacher.setDepartment(dept);
        }

        Teacher saved = teacherRepository.save(teacher);

        // Create login: username = email prefix, password = email prefix
        String emailPrefix = saved.getEmail().split("@")[0].toLowerCase();
        User user = User.builder()
                .username(emailPrefix)
                .password(passwordEncoder.encode(emailPrefix))
                .role(Role.TEACHER)
                .refId(saved.getId())
                .build();
        userRepository.save(user);

        return saved;
    }

    @Transactional
    public Teacher updateTeacher(Long id, Teacher updated) {
        Teacher teacher = getTeacherById(id);
        teacher.setName(updated.getName());
        teacher.setEmail(updated.getEmail());
        teacher.setPhone(updated.getPhone());
        teacher.setQualification(updated.getQualification());
        teacher.setSpecialization(updated.getSpecialization());

        if (updated.getDepartment() != null && updated.getDepartment().getId() != null) {
            Department dept = departmentRepository.findById(updated.getDepartment().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Department not found"));
            teacher.setDepartment(dept);
        }

        return teacherRepository.save(teacher);
    }

    public void deleteTeacher(Long id) {
        getTeacherById(id);
        teacherRepository.deleteById(id);
    }

    public List<Teacher> searchTeachers(String query) {
        return teacherRepository.findByNameContainingIgnoreCase(query);
    }
}
