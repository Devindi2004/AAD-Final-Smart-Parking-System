package org.example.backend.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.ParkingSlotDTO;
import org.example.backend.entity.ParkingLocation;
import org.example.backend.entity.ParkingSlot;
import org.example.backend.exception.ResourceNotFoundException;
import org.example.backend.repository.ParkingLocationRepository;
import org.example.backend.repository.ParkingSlotRepository;
import org.example.backend.service.ParkingSlotService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ParkingSlotServiceImpl implements ParkingSlotService {

    private final ParkingSlotRepository slotRepository;
    private final ParkingLocationRepository locationRepository;
    private final ModelMapper modelMapper;

    @Override
    public ParkingSlotDTO saveSlot(ParkingSlotDTO dto) {

        ParkingSlot slot = modelMapper.map(dto, ParkingSlot.class);

        ParkingLocation location = locationRepository.findById(dto.getLocationId())
                .orElseThrow(() -> new ResourceNotFoundException("Location not found"));

        slot.setLocation(location);

        ParkingSlot saved = slotRepository.save(slot);

        return modelMapper.map(saved, ParkingSlotDTO.class);
    }

    @Override
    public List<ParkingSlotDTO> getAllSlots() {

        return slotRepository.findAll()
                .stream()
                .map(s -> modelMapper.map(s, ParkingSlotDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ParkingSlotDTO getSlotById(Long id) {

        ParkingSlot slot = slotRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Slot not found"));

        return modelMapper.map(slot, ParkingSlotDTO.class);
    }

    @Override
    public void deleteSlot(Long id) {

        slotRepository.deleteById(id);
    }
}