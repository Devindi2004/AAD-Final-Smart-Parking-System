package org.example.backend.repository;

import org.example.backend.entity.ParkingSlot;
import org.example.backend.entity.ParkingLocation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParkingSlotRepository extends JpaRepository<ParkingSlot, Long> {

    List<ParkingSlot> findByLocation(ParkingLocation location);

}