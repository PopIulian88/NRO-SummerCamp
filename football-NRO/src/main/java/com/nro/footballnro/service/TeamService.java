package com.nro.footballnro.service;

import com.nro.footballnro.entity.Team;
import com.nro.footballnro.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    public List<Team> getAllTheTeams(){
        List<Team> teamList = new ArrayList<>();
        teamRepository.findAll().forEach(teamList::add);
        return teamList;
    }

    public void saveTeam(Team team){
        teamRepository.save(team);
    }

    public void updateTeam(Team team){
        teamRepository.save(team);
    }

    public void deleteTeam(Long id){
        teamRepository.deleteById(id);
    }


}
