package com.example.miniproject.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PredictDto {
    private Long predictId;
    private String name;
    private Long today;
    private Long oneweek;
    private Long twoweek;
}
