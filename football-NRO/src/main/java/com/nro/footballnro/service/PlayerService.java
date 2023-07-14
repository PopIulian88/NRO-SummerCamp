package com.nro.footballnro.service;

import com.nro.footballnro.entity.Player;
import com.nro.footballnro.entity.Team;
import com.nro.footballnro.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    public List<Player> findAll(){
        return  playerRepository.findAll();
    }
    public List<Player> findAllByTeam(Team team){
        return playerRepository.findAllByTeam(team);
    }

    public Player savePlayer(Player player){
         return playerRepository.save(player);
    }

    public Optional<Player> getById(Long id){
        return playerRepository.findById(id);
    }

    public void deletePlayer(Long id){
        playerRepository.deleteById(id);
    }



}
