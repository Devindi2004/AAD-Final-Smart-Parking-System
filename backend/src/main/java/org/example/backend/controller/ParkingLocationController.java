package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.ParkingLocationDTO;
import org.example.backend.service.ParkingLocationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
@RequiredArgsConstructor
@CrossOrigin
public class ParkingLocationController {

    private final ParkingLocationService locationService;

    @PostMapping
    public ParkingLocationDTO createLocation(@RequestBody ParkingLocationDTO dto) {
        return locationService.saveLocation(dto);
    }

    @GetMapping
    public List<ParkingLocationDTO> getAllLocations() {
        return locationService.getAllLocations();
    }

    @GetMapping("/{id}")
    public ParkingLocationDTO getLocation(@PathVariable Long id) {
        return locationService.getLocationById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteLocation(@PathVariable Long id) {
        locationService.deleteLocation(id);
    }
}