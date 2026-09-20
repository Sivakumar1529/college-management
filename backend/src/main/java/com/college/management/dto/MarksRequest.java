package com.college.management.dto;

import com.college.management.enums.ExamType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MarksRequest {
    private Long studentId;
    private Long teacherId;
    private String subject;
    private Integer marksObtained;
    private Integer totalMarks;
    private ExamType examType;
}
