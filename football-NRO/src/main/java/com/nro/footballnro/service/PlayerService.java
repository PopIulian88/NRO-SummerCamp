package com.nro.footballnro.service;

import com.nro.footballnro.entity.Player;
import com.nro.footballnro.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    public List<Player> getAllThePlayers(){
        List<Player> playerList = new ArrayList<>();
        playerRepository.findAll().forEach(playerList::add);
        return playerList;
    }

    public Player getPlayer(Long id){
        Optional<Player> optionalPlayer = playerRepository.findById(id);
        if(optionalPlayer.isPresent()){
            return optionalPlayer.get();
        }
        return null;
    }

    public void savePlayer(Player player){
        playerRepository.save(player);
    }

    public void updatePlayer(Player player){ //Posibil sa nu fie ok ca e SAVE
        playerRepository.save(player);
    }

    public void deletePlayer(Long id){
        playerRepository.deleteById(id);
    }


}
