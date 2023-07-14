package com.nro.footballnro.service;

import com.nro.footballnro.entity.Player;
import com.nro.footballnro.entity.Team;
import com.nro.footballnro.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private PlayerService playerService;

    public List<Team> getAllTheTeams(){
        List<Team> teamList = new ArrayList<>();
        teamRepository.findAll().forEach(teamList::add);
        return teamList;
    }

    public Optional<Team> getTeamById(Long id){
        return teamRepository.findById(id);
    }

    public void saveTeam(Team team){
        teamRepository.save(team);
    }

    public void updateTeam(Team team){
        teamRepository.save(team);
    }

    public void deleteTeam(Long id){
        Optional<Team> myTeamOptional = getTeamById(id);
        if(myTeamOptional.isPresent()){
            Team myTeam = myTeamOptional.get();
            List<Player> playerList = playerService.findAllByTeam(myTeam);

            for(Player player: playerList){
                player.setTeam(null);
            }
        }
        teamRepository.deleteById(id);
    }
}
