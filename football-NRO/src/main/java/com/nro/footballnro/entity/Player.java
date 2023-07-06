package com.nro.footballnro.entity;

import com.nro.footballnro.entity.enums.RoleEnum;
import jakarta.persistence.*;
import lombok.Data;


@Entity //(name = "test") // Ca sa schimbam numele tabelului(optional)
//Se pastreaza in baza de date
@Data //Ca sa faca automat get/set-ere
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column
    private String name;

    @Column
    private int goalsScored;

    @Column
    @Enumerated(EnumType.STRING)
    private RoleEnum role;


    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;
}
