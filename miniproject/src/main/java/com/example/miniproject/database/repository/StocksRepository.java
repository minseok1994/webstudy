package com.example.miniproject.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.miniproject.model.entity.StocksEntity;

public interface StocksRepository extends JpaRepository<StocksEntity, Long> {

}
