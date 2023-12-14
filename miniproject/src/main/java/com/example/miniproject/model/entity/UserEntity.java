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
@Entity(name = "UserEntity")
@Table(name = "customer")
public class UserEntity {
    private String id;
    private String pw;
    private String email;
    private Long age;
    private String job;
    private String single;
    private String mbti;
}
