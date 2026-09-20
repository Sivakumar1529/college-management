package com.college.management.dto;

import com.college.management.enums.ExamType;

public class MarksRequest {

    private Long studentId;
    private Long teacherId;
    private String subject;
    private Integer marksObtained;
    private Integer totalMarks;
    private ExamType examType;

    public MarksRequest() {
    }

    public MarksRequest(Long studentId, Long teacherId, String subject,
                        Integer marksObtained, Integer totalMarks,
                        ExamType examType) {
        this.studentId = studentId;
        this.teacherId = teacherId;
        this.subject = subject;
        this.marksObtained = marksObtained;
        this.totalMarks = totalMarks;
        this.examType = examType;
    }

    public Long getStudentId() {
        return studentId;
    }

    public Long getTeacherId() {
        return teacherId;
    }

    public String getSubject() {
        return subject;
    }

    public Integer getMarksObtained() {
        return marksObtained;
    }

    public Integer getTotalMarks() {
        return totalMarks;
    }

    public ExamType getExamType() {
        return examType;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public void setTeacherId(Long teacherId) {
        this.teacherId = teacherId;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setMarksObtained(Integer marksObtained) {
        this.marksObtained = marksObtained;
    }

    public void setTotalMarks(Integer totalMarks) {
        this.totalMarks = totalMarks;
    }

    public void setExamType(ExamType examType) {
        this.examType = examType;
    }
}