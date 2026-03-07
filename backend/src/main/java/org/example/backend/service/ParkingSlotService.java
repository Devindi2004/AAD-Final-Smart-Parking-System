package org.example.backend.service;

import org.example.backend.dto.ParkingSlotDTO;

import java.util.List;

public interface ParkingSlotService {

    ParkingSlotDTO saveSlot(ParkingSlotDTO dto);

    List<ParkingSlotDTO> getAllSlots();

    ParkingSlotDTO getSlotById(Long id);

    void deleteSlot(Long id);

}