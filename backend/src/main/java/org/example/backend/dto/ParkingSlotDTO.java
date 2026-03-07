package org.example.backend.dto;

import lombok.Data;

@Data
public class ParkingSlotDTO {

    private Long id;
    private String slotNumber;
    private String status;
    private Long locationId;

}