package com.example.miniproject.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.miniproject.model.entity.PredictEntity;

public interface PredictRepository extends JpaRepository<PredictEntity, Long> {

}
