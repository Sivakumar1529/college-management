package com.college.management.service;

import com.college.management.entity.Department;
import com.college.management.exception.*;
import com.college.management.repository.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Department getDepartmentById(Long id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + id));
    }

    public Department createDepartment(Department department) {
        if (departmentRepository.existsByName(department.getName())) {
            throw new DuplicateResourceException("Department already exists with name: " + department.getName());
        }
        if (departmentRepository.existsByCode(department.getCode())) {
            throw new DuplicateResourceException("Department already exists with code: " + department.getCode());
        }
        return departmentRepository.save(department);
    }

    public Department updateDepartment(Long id, Department updated) {
        Department dept = getDepartmentById(id);
        dept.setName(updated.getName());
        dept.setCode(updated.getCode());
        dept.setDescription(updated.getDescription());
        return departmentRepository.save(dept);
    }

    public void deleteDepartment(Long id) {
        getDepartmentById(id);
        departmentRepository.deleteById(id);
    }

    public List<Department> searchDepartments(String query) {
        return departmentRepository.findByNameContainingIgnoreCase(query);
    }
}
