package com.nro.footballnro.service;

import com.nro.footballnro.entity.Result;
import com.nro.footballnro.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ResultService {

    @Autowired
    private ResultRepository resultRepository;

    public List<Result> getAllTheResults(){
        List<Result> resultList = new ArrayList<>();
        resultRepository.findAll().forEach(resultList::add);
        return resultList;
    }

    public void saveResults(Result result){
        resultRepository.save(result);
    }

    public void updateResults(Result result){
        resultRepository.save(result);
    }

    public void deleteResults(Long id){
        resultRepository.deleteById(id);
    }
}
