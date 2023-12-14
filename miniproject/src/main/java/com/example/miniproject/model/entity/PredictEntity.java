package com.example.miniproject.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
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
@Entity(name = "PredictEntity")
@Table(name = "predict")
public class PredictEntity {
    private Long id;
    private String name;
    private Long today;
    private Long oneweek;
    private Long twoweek;
}
