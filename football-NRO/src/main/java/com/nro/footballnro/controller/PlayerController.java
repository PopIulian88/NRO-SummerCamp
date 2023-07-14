package com.nro.footballnro.controller;

import com.nro.footballnro.entity.Player;
import com.nro.footballnro.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @RequestMapping(value = "players", method = RequestMethod.GET)
    public ResponseEntity<List<Player>> findAllPlayers() {
        List<Player> players = playerService.findAll();
        return new ResponseEntity<>(players, HttpStatus.OK);
    }

    @RequestMapping(value = "players/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Player> updatePlayer(@RequestBody Player player, @PathVariable Long id){
        if (id.equals(player.getId())) {
            Optional<Player> optionalPlayer = playerService.getById(id);
            if(optionalPlayer.isPresent()){
                Player updatedPlayer = playerService.savePlayer(player);
                return new ResponseEntity<>(updatedPlayer, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return  new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }

    @RequestMapping(value = "players/save", method = RequestMethod.POST)
    public ResponseEntity<Player> savaPlayer(@Validated @RequestBody Player player){
        return new ResponseEntity<>(playerService.savePlayer(player), HttpStatus.CREATED);
    }

    @RequestMapping(value = "players/delete/{id}", method = RequestMethod.DELETE)
    public void deletePlayer(@PathVariable Long id){
        playerService.deletePlayer(id);
    }
}
