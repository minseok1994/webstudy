package com.example.miniproject.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.miniproject.database.dao.UsersDao;

public class UsersService {
    @Autowired
    private UsersDao usersDao;
}
