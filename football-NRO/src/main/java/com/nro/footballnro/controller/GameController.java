package com.nro.footballnro.controller;

import com.nro.footballnro.entity.Game;
import com.nro.footballnro.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class GameController {

    @Autowired
    private GameService gameService;

    @RequestMapping(value = "game", method = RequestMethod.GET)
    public List<Game> getGames(){
        return gameService.getAllTheGames();
    }

    @RequestMapping(value = "game/save", method = RequestMethod.POST)
    public void saveGame(@RequestBody Game game){
        gameService.saveGame(game);
    }

    @RequestMapping(value = "game/update", method = RequestMethod.PUT)
    public void updateGame(@RequestBody Game game){
        gameService.updateGame(game);
    }

    @RequestMapping(value = "game/delete/{id}", method = RequestMethod.DELETE)
    public void deleteGame(@PathVariable Long id){
        gameService.deleteGame(id);
    }
}
