package com.nro.footballnro.controller;

import com.nro.footballnro.entity.Team;
import com.nro.footballnro.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TeamController {

    @Autowired
    private TeamService teamService;

    @RequestMapping(value = "teams", method = RequestMethod.GET)
    public List<Team> getTeams(){
        return teamService.getAllTheTeams();
    }

    @RequestMapping(value = "teams/save", method = RequestMethod.POST)
    public void saveTeam(@RequestBody Team team){
        teamService.saveTeam(team);
    }

    @RequestMapping(value = "teams/update/{id}", method = RequestMethod.PUT)
    public void updateTeam(@RequestBody Team team, @PathVariable Long id){
        teamService.updateTeam(team);
    }

    @RequestMapping(value = "teams/delete/{id}", method = RequestMethod.DELETE)
    public void deleteTeam(@PathVariable Long id){
        teamService.deleteTeam(id);
    }
}
