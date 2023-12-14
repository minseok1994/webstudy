package com.example.miniproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.miniproject.database.dao.StocksDao;

@Service
public class StocksService {
    @Autowired
    private StocksDao stocksDao;
}
