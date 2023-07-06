package com.nro.footballnro.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column
    private String name;

    @Column
    private int goalScored;

    @Column
    private int goalsReceived;

    @Column
    private int victories;

    @Column
    private int defeats;

    @Column
    private int draws;

    @OneToMany(mappedBy = "teamOne")
    private List<Game> gamesAsTeamOne;

    @OneToMany(mappedBy = "teamTwo")
    private List<Game> gemesAsTeamTwo;

    @OneToMany(mappedBy = "team")
    private List<Player> players;

}
