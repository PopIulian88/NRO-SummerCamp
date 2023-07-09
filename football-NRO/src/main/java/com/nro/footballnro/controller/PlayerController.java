package com.nro.footballnro.controller;

import com.nro.footballnro.entity.Player;
import com.nro.footballnro.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @RequestMapping(value = "players", method = RequestMethod.GET)
    public List<Player> getPlayer() {
        return playerService.getAllThePlayers();
    }

    @RequestMapping(value = "players/{id}", method = RequestMethod.GET)
    public Player getPlayerById(@PathVariable Long id){
        return playerService.getPlayer(id);
    }

    @RequestMapping(value = "players/save", method = RequestMethod.POST)
    public void savaPlayer(@RequestBody Player player){
        playerService.savePlayer(player);
    }

    @RequestMapping(value = "players/update", method = RequestMethod.PUT)
    public void uppdatePlayer(@RequestBody Player player){
        playerService.updatePlayer(player);
    }

    @RequestMapping(value = "players/delete/{id}", method = RequestMethod.DELETE)
    public void deletePlayer(@PathVariable Long id){
        playerService.deletePlayer(id);
    }
}
