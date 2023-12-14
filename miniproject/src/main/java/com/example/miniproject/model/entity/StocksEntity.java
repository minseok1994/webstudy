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
@Entity(name = "StocksEntity")
@Table(name = "stocks")
public class StocksEntity {
    private Long id;
    private String name;
    private Long close;
    private Long open;
    private Long high;
    private Long low;
    private Long volume;
}
