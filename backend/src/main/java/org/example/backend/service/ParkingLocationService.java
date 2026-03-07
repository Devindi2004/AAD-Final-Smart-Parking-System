package org.example.backend.service;

import org.example.backend.dto.ParkingLocationDTO;

import java.util.List;

public interface ParkingLocationService {

    ParkingLocationDTO saveLocation(ParkingLocationDTO dto);

    List<ParkingLocationDTO> getAllLocations();

    ParkingLocationDTO getLocationById(Long id);

    void deleteLocation(Long id);

}