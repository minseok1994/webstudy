package com.example.miniproject.database.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.miniproject.database.repository.UsersRepository;
import com.example.miniproject.model.entity.UsersEntity;

@Service
public class UsersDao {
    @Autowired
    private UsersRepository usersRepository;

    public UsersEntity findByUserId(String usersId) {
        return usersRepository.findById(usersId).orElse(null);
    }

}
