package com.college.management.dto;

import com.college.management.enums.AttendanceStatus;
import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttendanceRequest {
    private Long studentId;
    private Long teacherId;
    private LocalDate date;
    private AttendanceStatus status;
    private String subject;
}
