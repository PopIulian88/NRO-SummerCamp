package com.nro.footballnro.controller;

import com.nro.footballnro.entity.Stadium;
import com.nro.footballnro.service.StadiumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StadiumController {

    @Autowired
    private StadiumService stadiumService;

    @RequestMapping(value = "stadium", method = RequestMethod.GET)
    public List<Stadium> getStadium(){
        return stadiumService.getAllTheStadiums();
    }

    @RequestMapping(value = "stadium/save", method = RequestMethod.POST)
    public void saveStadium(@RequestBody Stadium stadium){
        stadiumService.saveStadium(stadium);
    }

    @RequestMapping(value = "stadium/update", method = RequestMethod.PUT)
    public void updateStadium(@RequestBody Stadium stadium){
        stadiumService.updateStadium(stadium);
    }

    @RequestMapping(value = "stadium/delete/{id}", method = RequestMethod.DELETE)
    public void deleteStadium(@PathVariable Long id){
        stadiumService.deleteStadium(id);
    }
}
