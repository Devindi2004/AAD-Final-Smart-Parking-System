package org.example.backend.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.ParkingLocationDTO;
import org.example.backend.entity.ParkingLocation;
import org.example.backend.entity.User;
import org.example.backend.exception.ResourceNotFoundException;
import org.example.backend.repository.ParkingLocationRepository;
import org.example.backend.repository.UserRepository;
import org.example.backend.service.ParkingLocationService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ParkingLocationServiceImpl implements ParkingLocationService {

    private final ParkingLocationRepository locationRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public ParkingLocationDTO saveLocation(ParkingLocationDTO dto) {

        ParkingLocation location = modelMapper.map(dto, ParkingLocation.class);

        User owner = userRepository.findById(dto.getOwnerId())
                .orElseThrow(() -> new ResourceNotFoundException("Owner not found"));

        location.setOwner(owner);

        ParkingLocation saved = locationRepository.save(location);

        return modelMapper.map(saved, ParkingLocationDTO.class);
    }

    @Override
    public List<ParkingLocationDTO> getAllLocations() {

        return locationRepository.findAll()
                .stream()
                .map(l -> modelMapper.map(l, ParkingLocationDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ParkingLocationDTO getLocationById(Long id) {

        ParkingLocation location = locationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Location not found"));

        return modelMapper.map(location, ParkingLocationDTO.class);
    }

    @Override
    public void deleteLocation(Long id) {

        locationRepository.deleteById(id);
    }
}