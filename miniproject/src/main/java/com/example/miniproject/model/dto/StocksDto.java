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
public class StocksDto {
    private Long stock_id;
    private Long code;
    private String name;
    private Long close;
    private Long open;
    private Long high;
    private Long low;
    private Long volume;
    private Long change;
}
