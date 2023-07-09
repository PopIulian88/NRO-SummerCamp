package com.nro.footballnro.controller;

import com.nro.footballnro.entity.Result;
import com.nro.footballnro.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ResultController {

    @Autowired
    private ResultService resultService;

    @RequestMapping(value = "results", method = RequestMethod.GET)
    public List<Result> getResults(){
        return resultService.getAllTheResults();
    }

    @RequestMapping(value = "results/save", method = RequestMethod.POST)
    public void saveResults(@RequestBody Result result){
        resultService.saveResults(result);
    }

    @RequestMapping(value = "results/update", method = RequestMethod.PUT)
    public void updateResults(@RequestBody Result result){
        resultService.updateResults(result);
    }

    @RequestMapping(value = "results/delete/{id}", method = RequestMethod.DELETE)
    public void deleteResults(@PathVariable Long id){
        resultService.deleteResults(id);
    }

}
