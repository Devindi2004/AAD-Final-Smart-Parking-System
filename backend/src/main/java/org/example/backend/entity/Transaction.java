package org.example.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double totalAmount;

    private double commission;

    private double ownerEarning;

    private String status; // PAID, PENDING

    private LocalDateTime paymentDate;

    @OneToOne
    private Appointment appointment;
}