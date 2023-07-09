package com.nro.footballnro.service;

import com.nro.footballnro.entity.Game;
import com.nro.footballnro.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    public List<Game> getAllTheGames(){
        List<Game> gameList = new ArrayList<>();
        gameRepository.findAll().forEach(gameList::add);
        return gameList;
    }

    public void saveGame(Game game){
        gameRepository.save(game);
    }

    public void updateGame(Game game){
        gameRepository.save(game);
    }

    public void deleteGame(Long id){
        gameRepository.deleteById(id);
    }
}
