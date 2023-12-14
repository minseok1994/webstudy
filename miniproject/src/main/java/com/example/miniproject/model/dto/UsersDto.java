package com.example.miniproject.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
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
public class UsersDto {

    @NotBlank
    private String id;

    @NotBlank
    @Size(min = 8, max = 16, message = "비밀번호는 최소 8자리입니다.")
    private String pw;

    @Email
    private String email;

    @PositiveOrZero
    @Max(value = 120)
    private Long age;

    @Size(max = 20)
    private String job;

    private String single;

    @Size(min = 4, max = 4)
    private String mbti;

    private String role;
}
