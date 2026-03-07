package org.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.example.backend.enums.UserRole;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    private String status;
}