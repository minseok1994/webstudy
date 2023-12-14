package com.example.miniproject.service;

import org.springframework.stereotype.Service;

import com.example.miniproject.database.dao.PredictDao;

@Service
public class PredictService {
    @Autowired
    private PredictDao predictDao;
}
